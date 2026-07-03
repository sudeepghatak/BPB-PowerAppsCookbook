import { useEffect, useState } from 'react'
import { Cr331_leasesService } from '../generated/services/Cr331_leasesService'
import { Cr331_maintenancerequestsService } from '../generated/services/Cr331_maintenancerequestsService'
import { Cr331_propertiesService } from '../generated/services/Cr331_propertiesService'
import { Cr331_tenantsService } from '../generated/services/Cr331_tenantsService'

export type DataverseTablePreview = {
  logicalName: string
  displayName: string
  rows: Record<string, unknown>[]
  error?: string
}

type TableServiceResult = {
  success: boolean
  data?: unknown[]
  error?: unknown
}

type TableService = {
  getAll: (options?: { maxPageSize?: number }) => Promise<TableServiceResult>
}

type ConnectedTable = {
  logicalName: string
  displayName: string
  service: TableService
}

type UseDataverseTablesResult = {
  tables: DataverseTablePreview[]
  loading: boolean
  error: string | null
}

const rowLimit = 3

const systemColumnNames = new Set([
  'createdby',
  'createdon',
  'createdonbehalfby',
  'modifiedby',
  'modifiedon',
  'modifiedonbehalfby',
  'ownerid',
  'owningbusinessunit',
  'owningteam',
  'owninguser',
  'statecode',
  'statuscode',
  'versionnumber',
  'importsequencenumber',
  'overriddencreatedon',
  'timezoneruleversionnumber',
  'utcconversiontimezonecode',
  'transactioncurrencyid',
  'exchangerate',
  'processid',
  'stageid',
])

const supportedTables: Record<string, ConnectedTable> = {
  cr331_leases: {
    logicalName: 'cr331_leases',
    displayName: 'Leases',
    service: Cr331_leasesService,
  },
  cr331_maintenancerequests: {
    logicalName: 'cr331_maintenancerequests',
    displayName: 'Maintenance Requests',
    service: Cr331_maintenancerequestsService,
  },
  cr331_properties: {
    logicalName: 'cr331_properties',
    displayName: 'Properties',
    service: Cr331_propertiesService,
  },
  cr331_tenants: {
    logicalName: 'cr331_tenants',
    displayName: 'Tenants',
    service: Cr331_tenantsService,
  },
}

export const supportedTableNames = Object.keys(supportedTables)

function getConfiguredTables() {
  const configuredValue = import.meta.env.VITE_DATAVERSE_TABLES?.trim()
  if (!configuredValue) {
    return supportedTableNames.map((tableName) => supportedTables[tableName])
  }

  const requestedTableNames = configuredValue
    .split(',')
    .map((tableName: string) => tableName.trim())
    .filter(Boolean)

  return requestedTableNames
    .map((tableName: string) => supportedTables[tableName])
    .filter((table: ConnectedTable | undefined): table is ConnectedTable => Boolean(table))
}

export function formatError(error: unknown) {
  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === 'string') {
    return error
  }

  if (error && typeof error === 'object') {
    const message = (error as { message?: unknown }).message
    if (typeof message === 'string' && message.trim()) {
      return message
    }

    try {
      return JSON.stringify(error)
    } catch {
      return String(error)
    }
  }

  return String(error)
}

export function formatDataverseValue(value: unknown) {
  if (value === null || value === undefined) {
    return '—'
  }

  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }

  try {
    return JSON.stringify(value)
  } catch {
    return String(value)
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function toRowData(record: unknown): Record<string, unknown> {
  return isRecord(record) ? record : {}
}

function isSystemColumn(columnName: string) {
  if (!columnName) {
    return true
  }

  if (columnName.startsWith('_') || columnName.includes('@')) {
    return true
  }

  return systemColumnNames.has(columnName.toLowerCase())
}

export function getVisibleColumnNames(rows: Record<string, unknown>[]) {
  const columnNames: string[] = []
  const seen = new Set<string>()

  for (const row of rows) {
    for (const key of Object.keys(row)) {
      if (!seen.has(key) && !isSystemColumn(key)) {
        seen.add(key)
        columnNames.push(key)
      }
    }
  }

  return columnNames
}

export function useDataverseTables(enabled: boolean): UseDataverseTablesResult {
  const [tables, setTables] = useState<DataverseTablePreview[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) {
      return
    }

    let cancelled = false

    const configuredTables = getConfiguredTables()

    const loadDataverseTables = async () => {
      setLoading(true)
      setError(null)

      if (configuredTables.length === 0) {
        setError('No supported Dataverse tables are configured. Set VITE_DATAVERSE_TABLES to one or more supported logical names.')
        setTables([])
        setLoading(false)
        return
      }

      try {
        const previews = await Promise.all(
          configuredTables.map(async (table: ConnectedTable) => {
            try {
              const recordsResult = await table.service.getAll({ maxPageSize: rowLimit })

              if (!recordsResult.success) {
                throw recordsResult.error ?? new Error(`Unable to load rows for ${table.logicalName}.`)
              }

              return {
                logicalName: table.logicalName,
                displayName: table.displayName,
                rows: (recordsResult.data ?? []).map((record: unknown) => toRowData(record)),
              }
            } catch (error) {
              return {
                logicalName: table.logicalName,
                displayName: table.displayName,
                rows: [],
                error: formatError(error),
              }
            }
          }),
        )

        if (!cancelled) {
          setTables(previews)
        }
      } catch (error) {
        if (!cancelled) {
          setError(formatError(error))
          setTables([])
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void loadDataverseTables()

    return () => {
      cancelled = true
    }
  }, [enabled])

  return { tables, loading, error }
}


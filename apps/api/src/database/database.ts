export interface IDatabaseClient<T> {
    client: T | undefined
    connect(): Promise<void>
}

export interface IDatabaseMigration<T> {
    db: T
    up(): Promise<void>
    down(): Promise<void>
}
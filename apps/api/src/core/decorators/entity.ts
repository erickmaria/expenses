export function Entity(tableName: string) {
    return function(target: any) {
        Object.assign(target.prototype, { __name: tableName })
    }
}   
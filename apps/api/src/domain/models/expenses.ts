export class Expenses {

    public id?: number
    public name: string
    public value: number
    public dateExpiration: Date
    public installment: string
    public description: string
    public status: "pending" | "done" | "late"
    public tags: Array<string>
    public createdAt: Date
    public updatedAt: Date

    // constructor(
    //     id?: number,
    //     name: string,
    //     value: number,
    //     dateExpiration: Date,
    //     installment: string,
    //     description: string,
    //     status: "pending" | "done" | "late",
    //     tags: Array<string>
    // ) {
    //     this.id = id;
    //     this.name = name;
    //     this.value = value;
    //     this.dateExpiration = dateExpiration;
    //     this.installment = installment;
    //     this.description = description;
    //     this.status = status;
    //     this.tags = tags;
    //     this.createdAt = new Date()
    //     this.updatedAt = new Date()
    // }

    static formatDateToDDMMYY(date: Date): string {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);

        return `${day}-${month}-${year}`;
    }

    static formatDateToYYMMDD(date: Date): string {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);

        return `${year}-${month}-${day}`;
    }
}
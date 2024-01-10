export class ListWithTotalCount<TItem> {
    items: TItem[];
    totalCount: number;

    constructor(items: TItem[], totalCount: number) {
        this.items = items;
        this.totalCount = totalCount;
    }
}

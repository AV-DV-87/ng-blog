export class Article {
    id: number;
    title: string;
    description: string;

    toString() {
        return `[id=${this.id}, title=${this.title}]`
    }
}

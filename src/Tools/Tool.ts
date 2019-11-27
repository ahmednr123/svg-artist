export default interface Tool {
    init (): void;
    destroy (): void;
    getAttribute (path_id: string, attribute: string): string;
    onSelect (id: string): void;
    deSelect (id: string): void;
}
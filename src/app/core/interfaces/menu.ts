export interface Menus {
    path?: string;
    title?: string;
    icon?: string;
    type?: string;
    active?: boolean;
    children?: Menus[];
    permission?: string;
}

import { TopLevelCategory } from "./topoage.interface";

export interface Id {
    secondCategory: string;
}

export interface PageItem {
    alias: string;
    title: string;
    _id: string;
    category: string;
}

export interface MenuItem {
    _id: Id;
    pages: PageItem[];
    isOpened?: boolean;
}

export interface FirstLevelMenuItem {
    route: string;
    name: string;
    icon: JSX.Element;
    id: TopLevelCategory;
}
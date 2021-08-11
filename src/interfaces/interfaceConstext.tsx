

export interface getAPI {
    count: number;
    next: string;
    previous?: string;
    results: Result[];
}

export interface Result {
    name: string;
    url: string;
}

export interface urlInterface {
    urlActual: string,
    nextUrl: string,
    prevUrl: string,
}


export type FormValues = {
    user: string;
};



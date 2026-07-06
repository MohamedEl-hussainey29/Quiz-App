
export interface Question {
    _id: string;
    title: string;
    description: string;
    options?: {
        A: string;
        B: string;
        C: string;
        D: string;
        _id: string;
    },
    answer?: string;
    status?: string;
    instructor?: string;
    difficulty?: string;
    points?: number;
    type?: string;
}
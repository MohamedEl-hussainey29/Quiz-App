export interface Result{
    quiz: {
        _id: string;
        code: string;
        title: string;
        description: string;
        status: string;
        instructor: string;
        group: string;
        questions_number: number;
        schadule: string;
        duration: number;
        score_per_question: number;
        type: string;
        difficulty: string;
        updatedAt: string;
        createdAt: string;
        __v: number;
        closed_at: string;
    },
    participants: [{
        _id: string;
        quiz: {
            _id: string;
            title: string;
        },
        participant: {
            _id: string;
            first_name: string;
            last_name: string;
            email: string;
        },
        score: number;
        started_at: string;
    }]
}
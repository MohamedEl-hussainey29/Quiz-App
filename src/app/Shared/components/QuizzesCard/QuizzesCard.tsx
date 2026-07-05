"use client"
import {Card, CardAction, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import { MoveRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import quizImg1 from "../../../images/Quiz img-1.svg"
import quizImg2 from "../../../images/Quiz img-2.svg"
import { useEffect, useState } from "react"
import { QuizzesAPI } from "@/src/api"
import { toast } from "react-toastify"
import { Quiz } from "@/src/types/quizzes"
import SkeletonUI from "@/src/app/dashboard/students/components/Skeleton"
import NoData from "../NoData/NoData"

export default function QuizzesCard() {
    const [quizzes , setQuizzes] = useState<Quiz[]>([]);
    const [loading , setLoading] = useState(false);
    const quizImgs = [quizImg1 , quizImg2]

    useEffect(() => {
        const getQuizzes = async () => {
            setLoading(true);
            try {
            const response = await QuizzesAPI.GetUpcommingQuizzes();
            setQuizzes(response.data);
            } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
            } finally {
                setLoading(false);
            }
        };

        getQuizzes();
    }, []);

  return (
    <>
        <Card className="w-full">
            <CardHeader className="flex-wrap gap-2">
                <CardTitle className="text-lg sm:text-xl font-bold">
                Upcoming Quizzes
                </CardTitle>
                <CardAction>
                <Link
                    href="/dashboard/quizzes"
                    className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground whitespace-nowrap"
                >
                    <span>Quiz directory</span>
                    <MoveRight className="h-5 w-5 sm:h-6 sm:w-6 text-[#C5D86D] shrink-0" />
                </Link>
                </CardAction>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <SkeletonUI numElements={2} />
                ) : quizzes.length > 0 ? (
                    quizzes.map((quiz, index) => {
                    const date = new Date(quiz.schadule);
                    const formattedDate = date.toLocaleDateString("en-GB");
                    const formattedTime = date.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                    });

                    return (
                        <div key={quiz._id} className="flex flex-col sm:flex-row gap-3 sm:gap-4 border rounded-xl p-2 sm:pr-2 sm:p-0 mb-4">
                            <div className="shrink-0 rounded-xl overflow-hidden bg-[#FCE8D5] w-full h-32 sm:w-24 sm:h-24 flex items-center justify-center">
                                <Image
                                src={quizImgs[index % quizImgs.length]}
                                alt="Quiz Image"
                                className="w-full h-full object-contain"
                                />
                            </div>

                            <div className="flex flex-col justify-center flex-1 gap-1 min-w-0">
                                <h3 className="font-bold text-sm sm:text-base leading-tight wrap-break-word">
                                {quiz.title}
                                </h3>

                                <span className="text-xs sm:text-sm text-muted-foreground">
                                {formattedDate} | {formattedTime}
                                </span>

                                <div className="flex justify-between items-center gap-2 mt-2">
                                <p className="text-xs sm:text-sm font-semibold">
                                    No. of student’s enrolled: {quiz.participants}
                                </p>

                                <Link
                                    href={`/dashboard/quizzes/${quiz._id}`}
                                    className="flex items-center gap-1 shrink-0"
                                >
                                    <span className="font-semibold text-sm">Open</span>
                                    <MoveRight className="h-6 w-6 rounded-full bg-[#C5D86D] p-1 text-white shrink-0" />
                                </Link>
                                </div>
                            </div>
                        </div>
                    );
                    })
                ) : (
                    <NoData item="Quizzes" />
                )}
            </CardContent>
        </Card>
    </>
  )
}

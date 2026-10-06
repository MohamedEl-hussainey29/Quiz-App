import ResultDetailsTable from "../components/ResultsDetailsTable";

interface PageProps {
    params: Promise<{ resultsId: string }>;
}

export default async function ResultDetailsPage({ params }: PageProps) {
    const { resultsId } = await params;

    return <ResultDetailsTable resultsId={resultsId} />;
}
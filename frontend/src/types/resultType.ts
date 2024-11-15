type WordDetail = {
    letter: string;
    inWord: boolean;
    isPosCorrect: boolean;
}
type result = {
    currWord: string;
    isGuessed: boolean;
    wordDetail?: [WordDetail,WordDetail,WordDetail,WordDetail,WordDetail]
}

export type {result, WordDetail}
import type { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import { CATEGORIES } from '@constants/categories';
import ContainerPage from '@components/common/ContainerPage';
import PageTitle from '@components/common/PageTitle';
import TitleQuestionListPage from '@components/questionList/Title';
import WrapperQuestion from '@components/questionList/WrapperQuestion';
import ListCategory from '@components/questionList/ListCategory';
import ListQuestion from '@components/questionList/ListQuestion';
import { QuestionData, QUESTIONS } from '@constants/questions';

const QuestionListPage: NextPage = () => {
  const [selection, setSelection] = useState<boolean[]>(
    Array(CATEGORIES.length).fill(false),
  );
  const [questionMap, setQuestionMap] = useState<Map<string, QuestionData[]>>(
    new Map(),
  );
  const [page, setPage] = useState<number>(1);

  const categoryClick = (index: number) =>
    useCallback(() => {
      setPage(1);
      setSelection((state) => {
        const selection = [...state];
        selection[index] = !selection[index];
        return selection;
      });
    }, []);

  useEffect(() => {
    const map = new Map();
    CATEGORIES.forEach((category) => map.set(category, []));
    QUESTIONS.forEach((question) => map.get(question.category).push(question));
    setQuestionMap(map);
  }, []);

  return (
    <ContainerPage>
      <PageTitle title="면접 질문 목록" />
      <TitleQuestionListPage />
      <WrapperQuestion>
        <ListCategory selection={selection} categoryClick={categoryClick} />
        <ListQuestion
          page={page}
          setPage={setPage}
          selection={selection}
          questionMap={questionMap}
        />
      </WrapperQuestion>
    </ContainerPage>
  );
};

export default QuestionListPage;

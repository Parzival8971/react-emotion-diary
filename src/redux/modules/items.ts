// 액션 타입 정의
export const INIT_ITEM = 'emotion-diary/items/INIT_ITEM' as const;
export const CREATE_ITEM = 'emotion-diary/items/CREATE_ITEM' as const;
export const REMOVE_ITEM = 'emotion-diary/items/REMOVE_ITEM' as const;
export const EDIT_ITEM = 'emotion-diary/items/EDIT_ITEM' as const;

// 액션 생성 함수
export const initItem = (data: Array<DiaryItemType>) => ({
  type: INIT_ITEM,
  data,
});

export const createItem = (
  dataId: string,
  date: string,
  content: string,
  emotion: number,
  images: string
) => ({
  type: CREATE_ITEM,
  data: {
    id: dataId,
    date: new Date(date).getTime(),
    content,
    emotion,
    images,
  },
});

export const removeItem = (targetId: string) => ({
  type: REMOVE_ITEM,
  targetId,
});

export const editItem = (
  dataId: string,
  date: string,
  content: string,
  emotion: number,
  images: any
) => ({
  type: EDIT_ITEM,
  data: {
    id: dataId,
    date: new Date(date).getTime(),
    content,
    emotion,
    images,
  },
});

type DiaryItemActionType =
  | ReturnType<typeof initItem>
  | ReturnType<typeof createItem>
  | ReturnType<typeof removeItem>
  | ReturnType<typeof editItem>;

export type DiaryItemType = {
  id: string;
  date: string | number;
  content: string;
  emotion: number;
  images: string;
};

export type DiaryItemStateType = Array<DiaryItemType>;

// 초기값
const InitialState: DiaryItemStateType = [];

// 리듀서 실패작.... return을 주면 로컬에 저장을 할 수가 없음.
// export default function reducer(previousState = InitialState, action) {
//   if (action.type === INIT_ITEM) {
//     return action.data;
//   }

//   if (action.type === CREATE_ITEM) {
//     // console.log(action.data);
//     return [{ ...action.data }, ...previousState];
//   }

//   if (action.type === REMOVE_ITEM) {
//     return previousState.filter((it) => it.id !== action.targetId);
//   }

//   if (action.type === EDIT_ITEM) {
//     return previousState.map((it) =>
//       it.id === action.data.id ? { ...action.data } : it
//     );
//   }

//   localStorage.setItem('diary', JSON.stringify(previousState));

//   return previousState;
// }

export default function reducer(
  previousState: DiaryItemStateType = InitialState,
  action: DiaryItemActionType
) {
  let newState: DiaryItemStateType = [];
  switch (action.type) {
    case INIT_ITEM: {
      return action.data;
    }
    case CREATE_ITEM: {
      newState = [action.data, ...previousState];
      break;
    }
    case REMOVE_ITEM: {
      newState = previousState.filter((it) => it.id !== action.targetId);
      break;
    }
    case EDIT_ITEM: {
      newState = previousState.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return previousState;
  }
  localStorage.setItem('diary', JSON.stringify(newState));
  return newState;
}

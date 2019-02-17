import { handleActions } from 'redux-actions';
import { PersonModel } from 'app/models/PersonModel';
import { PersonsState } from 'app/reducers/state';

const initialState: PersonsState = [
    {
        id: 1,
        fio: 'Иванов Иван Иванович',
        post: 'кандидат физико-математических наук, доцент',
        interests: '<ul>' +
        '<li>Структура зависимости, копулы;</li>' +
        '<li>Семипараметрические модели анализа многомерных данных типа времени жизни;</li>' +
        '<li>Статистики многомерных рангов (multivariate rank statistics);</li>' +
        '<li>Биостатистика;</li>' +
        '<li>Анализ категориальных данных (categorical data analysis);</li>' +
        '<li>Анализ коротких временных рядов (Longitudinal data analysis).</li>' +
        '</ul>',
        bio: 'После окончания института прошел путь от старшего лаборанта до заведующего лаборатории гигиены воды и санитарной охраны водоемов научно-исследовательского института медико-экологических проблем МЗ Украины.' +
        '<br /><br />' +
        'После защиты кандидатской диссертации (1994) работал ассистентом, затем — доцентом кафедры медицинской биологии и генетики Буковинской государственной медицинской академии.' +
        '<br /><br />' +
        'В 1999 защитил докторскую диссертацию. В 2002 году получил ученое звание профессора. С 2000 по 2003 работал деканом педиатрического и медицинского факультетов Буковинской государственной медицинской академии.' +
        '<br /><br />' +
        'В 2004-2007 работал в Министерстве здравоохранения Украины на должности заместителя начальника отдела образования и науки Департамента кадровой политики, образования и науки. С 2007 — ректор Киевского медицинского университета Украинской ассоциации народной медицины[1], заведующий кафедрой нормальной физиологии и медицинской биологии.' +
        '<br /><br />' +
        '7 апреля 2010 приказом МИНЗДРАВА назначен и.о. ректора Буковинского государственного медицинского университета.' +
        '<br /><br />' +
        '12 ноября 2010 года на Конференции трудового коллектива БГМУ путем тайного голосования избран ректором Буковинского государственного медицинского университета.',
    },
    {
        id: 1,
        fio: 'Иванов Иван Иванович',
        post: 'кандидат физико-математических наук, доцент',
        interests: '<ul>' +
        '<li>Структура зависимости, копулы;</li>' +
        '<li>Семипараметрические модели анализа многомерных данных типа времени жизни;</li>' +
        '<li>Статистики многомерных рангов (multivariate rank statistics);</li>' +
        '<li>Биостатистика;</li>' +
        '<li>Анализ категориальных данных (categorical data analysis);</li>' +
        '<li>Анализ коротких временных рядов (Longitudinal data analysis).</li>' +
        '</ul>',
        bio: 'После окончания института прошел путь от старшего лаборанта до заведующего лаборатории гигиены воды и санитарной охраны водоемов научно-исследовательского института медико-экологических проблем МЗ Украины.' +
        '<br /><br />' +
        'После защиты кандидатской диссертации (1994) работал ассистентом, затем — доцентом кафедры медицинской биологии и генетики Буковинской государственной медицинской академии.' +
        '<br /><br />' +
        'В 1999 защитил докторскую диссертацию. В 2002 году получил ученое звание профессора. С 2000 по 2003 работал деканом педиатрического и медицинского факультетов Буковинской государственной медицинской академии.' +
        '<br /><br />' +
        'В 2004-2007 работал в Министерстве здравоохранения Украины на должности заместителя начальника отдела образования и науки Департамента кадровой политики, образования и науки. С 2007 — ректор Киевского медицинского университета Украинской ассоциации народной медицины[1], заведующий кафедрой нормальной физиологии и медицинской биологии.' +
        '<br /><br />' +
        '7 апреля 2010 приказом МИНЗДРАВА назначен и.о. ректора Буковинского государственного медицинского университета.' +
        '<br /><br />' +
        '12 ноября 2010 года на Конференции трудового коллектива БГМУ путем тайного голосования избран ректором Буковинского государственного медицинского университета.',
    },
    {
        id: 1,
        fio: 'Иванов Иван Иванович',
        post: 'кандидат физико-математических наук, доцент',
        interests: '<ul>' +
        '<li>Структура зависимости, копулы;</li>' +
        '<li>Семипараметрические модели анализа многомерных данных типа времени жизни;</li>' +
        '<li>Статистики многомерных рангов (multivariate rank statistics);</li>' +
        '<li>Биостатистика;</li>' +
        '<li>Анализ категориальных данных (categorical data analysis);</li>' +
        '<li>Анализ коротких временных рядов (Longitudinal data analysis).</li>' +
        '</ul>',
        bio: 'После окончания института прошел путь от старшего лаборанта до заведующего лаборатории гигиены воды и санитарной охраны водоемов научно-исследовательского института медико-экологических проблем МЗ Украины.' +
        '<br /><br />' +
        'После защиты кандидатской диссертации (1994) работал ассистентом, затем — доцентом кафедры медицинской биологии и генетики Буковинской государственной медицинской академии.' +
        '<br /><br />' +
        'В 1999 защитил докторскую диссертацию. В 2002 году получил ученое звание профессора. С 2000 по 2003 работал деканом педиатрического и медицинского факультетов Буковинской государственной медицинской академии.' +
        '<br /><br />' +
        'В 2004-2007 работал в Министерстве здравоохранения Украины на должности заместителя начальника отдела образования и науки Департамента кадровой политики, образования и науки. С 2007 — ректор Киевского медицинского университета Украинской ассоциации народной медицины[1], заведующий кафедрой нормальной физиологии и медицинской биологии.' +
        '<br /><br />' +
        '7 апреля 2010 приказом МИНЗДРАВА назначен и.о. ректора Буковинского государственного медицинского университета.' +
        '<br /><br />' +
        '12 ноября 2010 года на Конференции трудового коллектива БГМУ путем тайного голосования избран ректором Буковинского государственного медицинского университета.',
    },
    {
        id: 1,
        fio: 'Иванов Иван Иванович',
        post: 'кандидат физико-математических наук, доцент',
        interests: '<ul>' +
        '<li>Структура зависимости, копулы;</li>' +
        '<li>Семипараметрические модели анализа многомерных данных типа времени жизни;</li>' +
        '<li>Статистики многомерных рангов (multivariate rank statistics);</li>' +
        '<li>Биостатистика;</li>' +
        '<li>Анализ категориальных данных (categorical data analysis);</li>' +
        '<li>Анализ коротких временных рядов (Longitudinal data analysis).</li>' +
        '</ul>',
        bio: 'После окончания института прошел путь от старшего лаборанта до заведующего лаборатории гигиены воды и санитарной охраны водоемов научно-исследовательского института медико-экологических проблем МЗ Украины.' +
        '<br /><br />' +
        'После защиты кандидатской диссертации (1994) работал ассистентом, затем — доцентом кафедры медицинской биологии и генетики Буковинской государственной медицинской академии.' +
        '<br /><br />' +
        'В 1999 защитил докторскую диссертацию. В 2002 году получил ученое звание профессора. С 2000 по 2003 работал деканом педиатрического и медицинского факультетов Буковинской государственной медицинской академии.' +
        '<br /><br />' +
        'В 2004-2007 работал в Министерстве здравоохранения Украины на должности заместителя начальника отдела образования и науки Департамента кадровой политики, образования и науки. С 2007 — ректор Киевского медицинского университета Украинской ассоциации народной медицины[1], заведующий кафедрой нормальной физиологии и медицинской биологии.' +
        '<br /><br />' +
        '7 апреля 2010 приказом МИНЗДРАВА назначен и.о. ректора Буковинского государственного медицинского университета.' +
        '<br /><br />' +
        '12 ноября 2010 года на Конференции трудового коллектива БГМУ путем тайного голосования избран ректором Буковинского государственного медицинского университета.',
    },
    {
        id: 1,
        fio: 'Иванов Иван Иванович',
        post: 'кандидат физико-математических наук, доцент',
        interests: '<ul>' +
        '<li>Структура зависимости, копулы;</li>' +
        '<li>Семипараметрические модели анализа многомерных данных типа времени жизни;</li>' +
        '<li>Статистики многомерных рангов (multivariate rank statistics);</li>' +
        '<li>Биостатистика;</li>' +
        '<li>Анализ категориальных данных (categorical data analysis);</li>' +
        '<li>Анализ коротких временных рядов (Longitudinal data analysis).</li>' +
        '</ul>',
        bio: 'После окончания института прошел путь от старшего лаборанта до заведующего лаборатории гигиены воды и санитарной охраны водоемов научно-исследовательского института медико-экологических проблем МЗ Украины.' +
        '<br /><br />' +
        'После защиты кандидатской диссертации (1994) работал ассистентом, затем — доцентом кафедры медицинской биологии и генетики Буковинской государственной медицинской академии.' +
        '<br /><br />' +
        'В 1999 защитил докторскую диссертацию. В 2002 году получил ученое звание профессора. С 2000 по 2003 работал деканом педиатрического и медицинского факультетов Буковинской государственной медицинской академии.' +
        '<br /><br />' +
        'В 2004-2007 работал в Министерстве здравоохранения Украины на должности заместителя начальника отдела образования и науки Департамента кадровой политики, образования и науки. С 2007 — ректор Киевского медицинского университета Украинской ассоциации народной медицины[1], заведующий кафедрой нормальной физиологии и медицинской биологии.' +
        '<br /><br />' +
        '7 апреля 2010 приказом МИНЗДРАВА назначен и.о. ректора Буковинского государственного медицинского университета.' +
        '<br /><br />' +
        '12 ноября 2010 года на Конференции трудового коллектива БГМУ путем тайного голосования избран ректором Буковинского государственного медицинского университета.',
    },
    {
        id: 1,
        fio: 'Иванов Иван Иванович',
        post: 'кандидат физико-математических наук, доцент',
        interests: '<ul>' +
        '<li>Структура зависимости, копулы;</li>' +
        '<li>Семипараметрические модели анализа многомерных данных типа времени жизни;</li>' +
        '<li>Статистики многомерных рангов (multivariate rank statistics);</li>' +
        '<li>Биостатистика;</li>' +
        '<li>Анализ категориальных данных (categorical data analysis);</li>' +
        '<li>Анализ коротких временных рядов (Longitudinal data analysis).</li>' +
        '</ul>',
        bio: 'После окончания института прошел путь от старшего лаборанта до заведующего лаборатории гигиены воды и санитарной охраны водоемов научно-исследовательского института медико-экологических проблем МЗ Украины.' +
        '<br /><br />' +
        'После защиты кандидатской диссертации (1994) работал ассистентом, затем — доцентом кафедры медицинской биологии и генетики Буковинской государственной медицинской академии.' +
        '<br /><br />' +
        'В 1999 защитил докторскую диссертацию. В 2002 году получил ученое звание профессора. С 2000 по 2003 работал деканом педиатрического и медицинского факультетов Буковинской государственной медицинской академии.' +
        '<br /><br />' +
        'В 2004-2007 работал в Министерстве здравоохранения Украины на должности заместителя начальника отдела образования и науки Департамента кадровой политики, образования и науки. С 2007 — ректор Киевского медицинского университета Украинской ассоциации народной медицины[1], заведующий кафедрой нормальной физиологии и медицинской биологии.' +
        '<br /><br />' +
        '7 апреля 2010 приказом МИНЗДРАВА назначен и.о. ректора Буковинского государственного медицинского университета.' +
        '<br /><br />' +
        '12 ноября 2010 года на Конференции трудового коллектива БГМУ путем тайного голосования избран ректором Буковинского государственного медицинского университета.',
    },
];

export const personsReducer = handleActions<PersonsState, PersonModel>(
  {
    // [PersonsActions.Type.ADD_TODO]: (state, action) => {
    //   if (action.payload && action.payload.text) {
    //     return [
    //       {
    //         id: state.reduce((max, todo) => Math.max(todo.id || 1, max), 0) + 1,
    //         completed: false,
    //         text: action.payload.text
    //       },
    //       ...state
    //     ];
    //   }
    //   return state;
    // },
    // [PersonsActions.Type.DELETE_TODO]: (state, action) => {
    //   return state.filter((todo) => todo.id !== (action.payload as any));
    // },
    // [PersonsActions.Type.EDIT_TODO]: (state, action) => {
    //   return state.map((todo) => {
    //     if (!todo || !action || !action.payload) {
    //       return todo;
    //     }
    //     return (todo.id || 0) === action.payload.id ? { ...todo, text: action.payload.text } : todo;
    //   });
    // },
    // [PersonsActions.Type.COMPLETE_TODO]: (state, action) => {
    //   return state.map((todo) =>
    //     todo.id === (action.payload as any) ? { ...todo, completed: !todo.completed } : todo
    //   );
    // },
    // [PersonsActions.Type.COMPLETE_ALL]: (state, action) => {
    //   return state.map((todo) => ({ ...todo, completed: true }));
    // },
    // [PersonsActions.Type.CLEAR_COMPLETED]: (state, action) => {
    //   return state.filter((todo) => todo.completed === false);
    // }
  },
  initialState
);

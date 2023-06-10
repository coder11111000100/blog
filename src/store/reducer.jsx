/* eslint-disable no-use-before-define */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const articlesLoadList = createAsyncThunk('@@create/articles', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch('https://blog.kata.academy/api/articles');
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  } catch (error) {
    return rejectWithValue('Failed to fetch  all articles');
  }
});

const getArticle = createAsyncThunk('@@get/article', async (slug, { rejectWithValue }) => {
  try {
    const res = await fetch(`https://blog.kata.academy/api/articles${slug}`);
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  } catch (error) {
    return rejectWithValue('Failed to fetch  all articles');
  }
});

const pageArticles = createAsyncThunk('@@page/articles', async (page, { dispatch, rejectWithValue }) => {
  dispatch(pagePush(page));
  try {
    const number = page * 20;
    const res = await fetch(`https://blog.kata.academy/api/articles?offset=${number}`);
    if (!res.ok) {
      throw new Error();
    }

    return res.json();
  } catch (error) {
    return rejectWithValue('Failed to fetch ');
  }
});

// =======================
const newArticle = createAsyncThunk('@@new/article', async (datas, { rejectWithValue, getState }) => {
  const { arg, tagList } = datas;
  const TOKEN = getState().user?.user?.user?.token;
  try {
    const res = await fetch('https://blog.kata.academy/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${TOKEN}`,
      },
      body: JSON.stringify({
        article: { ...arg, tagList },
      }),
    });
    if (!res.ok) {
      throw new Error(res);
    }
    return await res.json();
  } catch (error) {
    return rejectWithValue('Failed to fetch  User');
  }
});

const UpdateArticle = createAsyncThunk('@@Update/article', async (datas, { rejectWithValue, getState }) => {
  const { slug, arg, tagList } = datas;
  const TOKEN = getState().user?.user?.user?.token;

  try {
    const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${TOKEN}`,
      },
      body: JSON.stringify({
        article: { ...arg, tagList },
      }),
    });
    if (!res.ok) {
      return res.text().then((text) => {
        throw new Error(text);
      });
    }
    return await res.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const DeleteArticle = createAsyncThunk('@@Delete/article', async (slug, { rejectWithValue, getState }) => {
  const TOKEN = getState().user?.user?.user?.token;
  try {
    const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${TOKEN}`,
      },
    });
    if (!res.ok) {
      return res.text().then((text) => {
        throw new Error(text);
      });
    }
    return await res.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const setFavorite = createAsyncThunk('@@Set/article', async (slug, { rejectWithValue, getState }) => {
  let TOKEN = getState().user?.user?.user?.token;
  if (!TOKEN) {
    TOKEN = '';
  }
  try {
    const res = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${TOKEN}`,
      },
    });
    if (!res.ok) {
      return res.text().then((text) => {
        throw new Error(text);
      });
    }
    return await res.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const deleteFavorite = createAsyncThunk('@@Delete/article', async (slug, { rejectWithValue, getState }) => {
  let TOKEN = getState().user?.user?.user?.token;
  if (!TOKEN) {
    TOKEN = ' ';
  }
  try {
    const res = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${TOKEN}`,
      },
    });
    if (!res.ok) {
      return res.text().then((text) => {
        throw new Error(text);
      });
    }
    return await res.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const sliceArticles = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    myFavorited: [],
    singlArticle: [],
    articlePage: 1,
    articleTotalPage: 50,
    articlesLoader: false,
    articlesError: null,
  },
  reducers: {
    pagePush: (state, action) => {
      state.articlePage = action.payload;
      if (state.articleTotalPage / 10 === action.payload) {
        state.articleTotalPage += 50;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setFavorite.fulfilled, (state, action) => {
        const { article } = action.payload;
        state.myFavorited.push(article.slug);
        const arr = state.articles.map((item) => {
          if (item.slug === article.slug) {
            return article;
          }
          return item;
        });
        state.articles = arr;
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        const { article } = action.payload;
        state.myFavorited.pop(article.slug);
        const arr = state.articles.map((item) => {
          if (item.slug === article.slug) {
            return article;
          }
          return item;
        });
        state.articles = arr;
      })
      .addMatcher(
        (action) => {
          return action.type.endsWith('/articles/pending');
        },
        (state) => {
          state.articlesLoader = true;
        }
      )
      .addMatcher(
        (action) => {
          return action.type.endsWith('/articles/fulfilled');
        },
        (state, action) => {
          state.articles = action.payload.articles;
          state.articlesLoader = false;
          state.articlesError = null;
        }
      )
      .addMatcher(
        (action) => {
          return action.type.endsWith('/articles/rejected');
        },
        (state, action) => {
          state.articlesLoader = false;
          state.articlesError = action.payload || action.error.message;
        }
      );
  },
});

export const { pagePush } = sliceArticles.actions;

export {
  sliceArticles,
  pageArticles,
  articlesLoadList,
  newArticle,
  getArticle,
  UpdateArticle,
  DeleteArticle,
  setFavorite,
  deleteFavorite,
};

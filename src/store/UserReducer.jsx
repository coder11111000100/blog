import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const createAccount = createAsyncThunk(
  '@@create/account',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const res = await fetch('https://blog.kata.academy/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            username,
            email,
            password,
          },
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
  }
);

const signInAccount = createAsyncThunk('@@sugnIn/account', async ({ email, password }, { rejectWithValue }) => {
  try {
    const res = await fetch('https://blog.kata.academy/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email,
          password,
        },
      }),
    });
    if (!res.ok) {
      return res.text().then((text) => {
        throw new Error(text);
      });
    }
    return await res.json();
  } catch (error) {
    return rejectWithValue('Failed to fetch  User');
  }
});

const UpdateUserProfileAccount = createAsyncThunk(
  '@@UpdateUser/account',
  async (data, { rejectWithValue, getState }) => {
    const TOKEN = getState().user?.user?.user?.token;
    try {
      const res = await fetch('https://blog.kata.academy/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${TOKEN}`,
        },
        body: JSON.stringify({
          user: data,
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
  }
);

const sliceUser = createSlice({
  name: 'user',
  initialState: {
    userError: null,
  },
  reducers: {
    loginUser: (state) => {
      state.login = true;
    },
    logOutUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => {
          return action.type.endsWith('/account/fulfilled');
        },
        (state, action) => {
          state.user = action.payload;
          state.userStatus = true;
          state.userError = null;
        }
      )
      .addMatcher(
        (action) => {
          return action.type.endsWith('/account/rejected');
        },
        (state, action) => {
          state.userError = action.payload || action.error.message;
        }
      );
  },
});

const { loginUser, logOutUser } = sliceUser.actions;
export { loginUser, logOutUser, sliceUser, createAccount, signInAccount, UpdateUserProfileAccount };

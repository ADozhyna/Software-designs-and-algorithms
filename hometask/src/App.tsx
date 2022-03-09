import { useState, useEffect } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';

import { Table, Filters, Sort, Search } from './components';
import { getImages, getUsers, getAccounts } from './mocks/api';

import styles from './App.module.scss';

import type { Row } from './components';
import type { Image, User, Account, Payment } from '../types';

import rows from './mocks/rows.json';
import { stringify } from 'querystring';

interface IStore {
  data: Row[],
  filters: string[],
  searchString: string,
  sortLogic: string
}

// mockedData has to be replaced with parsed Promises’ data
const mockedData: Row[] = rows.data;

const accountsConverter = (accounts: Account[]) => {
  return accounts.map(acc => {
    const { userID, posts, payments } = acc;
    const lastPayments = payments.reduce((a, b) => new Date(a.date) > new Date(b.date) ? a : b, {} as Payment).totalSum || 0;
    
    return {
      userID,
      posts,
      lastPayments
    }
  });
}

const dataConverter = (users: User[], accounts: { userID: string, posts: number, lastPayments: number }[], images: Image[]): Row[] => {
  return users.map(user => {
    const { userID, ...userData } = user;
    const { posts, lastPayments } = accounts.find(acc => acc.userID === userID);
    const { url: avatar } = images.find(image => image.userID === userID);
    const row = {
      ...userData,
      avatar,
      posts,
      lastPayments
    }
    
    return row;
  });
};

const getSortFunction = (sort: string) => {
  switch(sort) {
    case 'desc':
      return (a: Row, b: Row) => {
        if (a.lastPayments > b.lastPayments) return 1;
        if (a.lastPayments === b.lastPayments) return 0;
        if (a.lastPayments < b.lastPayments) return -1;
      }
    case 'asc':
      return (a: Row, b: Row) => {
        if (a.lastPayments > b.lastPayments) return -1;
        if (a.lastPayments === b.lastPayments) return 0;
        if (a.lastPayments < b.lastPayments) return 1;
      }
  }
}

const storeChangesHandler = (store: IStore) => {
  let data = [];

  if (store.filters) {
    data = store.filters.map(filter => store.data.filter(row => filter === 'Without posts' ? row.posts === 0 : row.posts > 100)).flat()
  }

  if (store.searchString) {
    data = data.concat(store.data.filter(row => row.country.toLowerCase().includes(store.searchString.toLowerCase())));
  }

  if (store.sortLogic) {
    data = data.length ? data : store.data;
    data = data.sort(getSortFunction(store.sortLogic));
  }

  return data.length ? Array.from(new Set([...data])) : store.data;
}

function App() {
  const [store, setStore] = useState<IStore>({
    data: undefined,
    filters: [],
    searchString: '',
    sortLogic: ''
  });

  let data = store.data;

  const updateStore = (name: string, value: any, data = store) => {
    setStore({...data, [name]: value});
  }

  data = storeChangesHandler(store);

  useEffect(() => {
    // fetching data from API
    Promise.all([getImages(), getUsers(), getAccounts()])
    .then(([images, users, accounts]: [Image[], User[], Account[]]) => dataConverter(users, accountsConverter(accounts), images))
    .then(rows => setStore(s => ({...s, data: rows})));
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <div className="App">
        <div className={styles.container}>
          <div className={styles.sortFilterContainer}>
            <Filters store={store} updateStore={updateStore}/>
            <Sort store={store} updateStore={updateStore}/>
          </div>
          <Search store={store} updateStore={updateStore}/>
        </div>
        <Table rows={data || mockedData} />
      </div>
    </StyledEngineProvider>
  );
}

export default App;

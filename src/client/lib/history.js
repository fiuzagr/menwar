// history.js
import { useRouterHistory } from 'react-router';
import { createHistory, createMemoryHistory } from 'history';

// use memory in ssr mode
const create = process.env.BROWSER ?
  createHistory :
  createMemoryHistory;
//const create = createHistory;

// Run our app under the /base URL.
function history (base) {

  base = base || '/';

  return useRouterHistory(create)({
    basename: base,
  });

}

export default history;


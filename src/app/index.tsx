import * as React from 'react';
import { Route, Switch } from 'react-router';
import { hot } from 'react-hot-loader';
import {Header} from 'app/components';
import {IndexPage} from 'app/components/Pages';
import {AddPage} from 'app/components/Pages/add';
import {ListPage} from 'app/containers/Pages/list';
import {DetailPage} from 'app/containers/Pages/detail';

export const App = hot(module)(() => (
    <>
        <Header />
        <Switch>
            <Route path="/" component={IndexPage} exact={true} />
            <Route path="/add" component={AddPage} />
            <Route path="/list/:admin?" component={ListPage} />
            <Route path="/detail/:id/:admin?" component={DetailPage} />
        </Switch>
        {/*<Footer*/}
            {/*filter={filter}*/}
            {/*activeCount={activeCount}*/}
            {/*completedCount={completedCount}*/}
            {/*onClickClearCompleted={this.handleClearCompleted}*/}
            {/*onClickFilter={this.handleFilterChange}*/}
        {/*/>*/}
    </>
));

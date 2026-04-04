import { Routes } from '@angular/router';
import { Auth } from './pages/auth/auth';
import { Database } from './pages/database/database';
import { FlowEditor } from './pages/flow-editor/flow-editor';
import { Test } from './pages/test/test';
export const routes: Routes = [

    { path: '', component: Auth },
    { path: 'dashboard', component: Database },
    { path: 'api', component: FlowEditor },
    { path: 'test', component: Test },


];


import Paper from '@material-ui/core/Paper';
import { styles } from '../utils/theme';
import { useState } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import ButtonAppBar from '@/features/button-app-bar';
import Dashboard from '@/features/dashboard';

export default function Home(): JSX.Element {
  const classes = styles();
  return (
    <div>
      <CssBaseline />
      <ButtonAppBar/>
      <div>
        <Dashboard />
      </div>
    </div>
  )
}

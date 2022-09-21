import type { NextPage } from 'next'
import Paper from '@material-ui/core/Paper';
import { styles } from './theme';
import { URLForm } from '@/components/URLForm';
import { useState } from 'react';

export default function Home(): JSX.Element {
  const classes = styles();
  const baseUrl = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  const [shortenedPath, setShortenedPath] = useState<string | undefined>(undefined);
  return (
    <div className={classes.container}>
      <Paper elevation={3} className={classes.paper}>
        <URLForm onSubmit={setShortenedPath} />
        {shortenedPath && (
          <div className={classes.result}>
            <a href={`${baseUrl}/${shortenedPath}`}>{`${baseUrl}/${shortenedPath}`}</a>
          </div>
        )}
      </Paper>
    </div>
  )
}
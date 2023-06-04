# Github Issue Tracker

This repository contains all the code necessary to run both frontend and backend, if you want to do so locally, all that's needed is to clone the repository, install the dependencies via `npm i`, add the environment variables (detailed bellow), execute `npm run build` and then `npm run start` in both the client and server folders and that's it!

Alternatively, this repository comes ready to be deployed in Vercel, just fork it in GitHub, create a new project in Vercel, import the repo, add the env variables (in this case `PORT` is not needed and `REACT_APP_API_URL` needs to be set to `/api`) and hit deploy!\
If you use the "Import Third-Party Git Repository" feature the first deploy will fail due the lack of env variables, but adding them afterwards in project settings and redeploying should do the trick.

## Environment variables

An `.env.example` is provided in both folders, duplicating them and renaming to `.env` should be enough to have the app running with no further changes, however, here's a brief explanation of what each one does:

### Frontend (client/.env)
| VARIABLE          | DESCRIPTION                                                                                          |
|-------------------|------------------------------------------------------------------------------------------------------|
| REACT_APP_API_URL | Absolute or relative (if hosted in the same domain) URL where request to backend will be directed to |

### Backend (server/.env)
| VARIABLE          | DESCRIPTION                                                                                       |
|-------------------|---------------------------------------------------------------------------------------------------|
| PORT              | The port in which the API will be responding                                                      |
| ORGANIZATION      | The slug of the GitHub organization from which members and issues will be pulled                  |
| REPOSITORY        | The slug of the GitHub repository from which issues will be pulled                                |
| LABELS_WEIGHT     | A series of `label-id:score-weight` pairs separated by comma, e.g: `3330002222:50,2220005556:100` |
| OVERDUE_THRESHOLD | The score number an issue needs to reach to be considered overdue                                 |
| GITHUB_TOKEN      | The authorization used for the GitHub API calls, can be a Personal Access Token for example       |

## Score calculation

The backend comes with a pre built in issue score calculation which needs to be set up using the `LABELS_WEIGHT` and `OVERDUE_THRESHOLD` env variables, the calculation consists on multiplying the weight of its highest priority label by the number of business days that have passed since its creation.\
The weight of the labels are assigned on the `LABELS_WEIGHT` variable, to do so, you need to have the labels' IDs on hand, you can find those visiting the following URL in your browser replacing `ORGANIZATION` and `REPOSITORY` with the real data:
```
https://api.github.com/repos/ORGANIZATION/REPOSITORY/labels
```

If that calculation doesn't suit your organization needs, you can easily make your own, all you need to do is head up to `server/src/scoreCalculation` folder, duplicate the `default.ts` file and use it as a template to build your own score calculation, once that's done, modify the export of `index.ts` (the one in the same folder) to let the API know which score calculator function to use.

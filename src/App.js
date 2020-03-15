import React, {useState, useEffect, forwardRef} from 'react'
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import MaterialTable, { MTableToolbar } from "material-table";

import {
  getMaskUsageInstruction,
  getAffectedCountries,
  getCasesByCountry,
  getWorldTotalStat
} from './utils/apiRequest'
import './App.css'
import  AppBar  from './components/Appbar';
import  Loader  from './components/Loader';
import {formatDateTime} from './utils/functions'

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#2196f3',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: 'Montserrat'
  },
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    flexGrow: 1,
    padding: theme.spacing(1),
    height: 120
  },
  date:{
    marginTop: 80,
    float: 'right',
    [theme.breakpoints.up('sm')]: {
      visibility: 'hidden'
     },
  },
}));

function App() {
  const [maskUsageInstructions, setMaskUsageInstructions] = useState([])
  const [affectedCountries, setAffectedCountries] = useState([])
  const [casesByCountry, setCasesByCountry] = useState([])
  const [worldTotalStat, setWorldTotalStat] = useState([])

  useEffect(() => {
    async function loadData(){
      // let maskUsageInstruction = await getMaskUsageInstruction()
      // let affectedCountries    = await getAffectedCountries()
      let casesByCountry       = await getCasesByCountry()
      let worldTotalStat       = await getWorldTotalStat()
      casesByCountry = casesByCountry.countries_stat.map(countryData => {
        return {
          country: countryData.country_name,
          totalCases: countryData.cases,
          totalDeaths: countryData.deaths,
          totalRecovered: countryData.total_recovered,
          newCases: countryData.new_cases,
          newDeaths: countryData.new_deaths
        }
      })
      // setMaskUsageInstructions(maskUsageInstruction)
      // setAffectedCountries(affectedCountries)
      setCasesByCountry(casesByCountry)
      setWorldTotalStat(worldTotalStat)
    }
    loadData()
    setInterval(loadData, 10000)
  },[])

  const classes = useStyles();
  return (
    <>
    {
      casesByCountry.length > 0 ? 
      <div className={classes.root}>
        <ThemeProvider theme={theme}>
          <AppBar statsDate={worldTotalStat.statistic_taken_at}/>
          <Typography className={classes.date}>
            <span style={{fontStyle:'italic'}}>As per - </span> 
            {formatDateTime(worldTotalStat.statistic_taken_at)}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card className={classes.card} variant="outlined">
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Total Countries Affected
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {casesByCountry.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className={classes.card} variant="outlined">
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Total Cases
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {worldTotalStat.total_cases}
                  </Typography>
                  <Typography variant="body2">
                    New Cases &nbsp;{worldTotalStat.new_cases}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
            <Card className={classes.card} variant="outlined">
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Total Deaths
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {worldTotalStat.total_deaths}
                  </Typography>
                  <Typography variant="body2">
                    New Deaths &nbsp; 
                    <span style={{color: 'red'}}>{worldTotalStat.new_deaths}</span>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className={classes.card} variant="outlined">
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Total Recovered
                  </Typography>
                  <Typography variant="h5" component="h2" >
                    {worldTotalStat.total_recovered}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <MaterialTable
              style={{marginTop: 10, border: '1px solid #DFE0DF', boxShadow: 'none'}}
              icons={tableIcons}
              columns={[
                { title: "Country", field: "country" },
                { title: "Total Cases", field: "totalCases"},
                { title: "Total Deaths", field: "totalDeaths"},
                { title: "Total Recovered", field: "totalRecovered"},
                { title: "New Cases", field: "newCases"},
                { title: "New Deaths", field: "newDeaths"}
              ]}
              data={casesByCountry}
              title="Cases By Country"
              isLoading={casesByCountry.length<0 && true}
              options={{
                // selection: true,
                exportButton: true,
                pageSizeOptions: [5, 10, 50, casesByCountry.length],
                rowStyle: {
                '&:nthChild(2)':{
                  backgroundColor: '#F7F7F7'
                }
                },
                headerStyle:{
                  backgroundColor: '#F7F7F7',
                }
              }}
              
              components={{
                // Toolbar: props => (
                //     <div style={{ backgroundColor: '#e8eaf5',color:'red' }}>
                //         <MTableToolbar {...props} />
                //     </div>
                // )
              }}

          />
          {/* <Snackbar  
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
            }} 
            open={true} 
            autoHideDuration={6000}  
            message="Note archived" /> */}
        </ThemeProvider>
      </div>
      : <Loader isLoaded={casesByCountry.length>0}/>
    }
    </>
  );
}

export default App;

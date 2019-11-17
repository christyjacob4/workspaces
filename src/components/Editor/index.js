import React, { useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-jsx";
/*eslint-disable no-alert, no-console */
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";

import { makeStyles } from "@material-ui/core/styles";
// import { withStyles } from "@material-ui/core/styles";
// import { green } from "@material-ui/core/colors";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
// import Checkbox from "@material-ui/core/Checkbox";

import { withFirebase } from "../Firebase";

// const GreenCheckbox = withStyles({
//   root: {
//     color: green[400],
//     "&$checked": {
//       color: green[600],
//     },
//   },
//   checked: {},
// })(props => <Checkbox color="default" {...props} />);

const fontSizes = [10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40];
const languages = [
  "javascript",
  "java",
  "python",
  "xml",
  "ruby",
  "sass",
  "markdown",
  "mysql",
  "json",
  "html",
  "handlebars",
  "golang",
  "csharp",
  "elixir",
  "typescript",
  "css",
];

const themes = [
  "monokai",
  "github",
  "tomorrow",
  "kuroir",
  "twilight",
  "xcode",
  "textmate",
  "solarized_dark",
  "solarized_light",
  "terminal",
];

languages.forEach(lang => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});
themes.forEach(theme => require(`ace-builds/src-noconflict/theme-${theme}`));

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%",
    height: 50,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Editor = props => {
  const classes = useStyles();
  let { code, setCode, id } = props;
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("twilight");
  const [mode, setMode] = useState("markdown");
  const [fontSize, setFontSize] = useState(20);
  const [basicAutocomplete, setBasicAutocomplete] = useState(false);
  const [liveAutocomplete, setLiveAutocomplete] = useState(true);
  const [printMargin, setPrintMargin] = useState(true);
  const [gutter, setGutter] = useState(true);
  const [activeLine, setActiveLine] = useState(false);
  const [enableSnippets, setEnableSnippets] = useState(true);
  const [lineNumbers, setLineNumbers] = useState(true)

  const onload = () => {
    console.log("Component Loaded");
  };

  const onchange = e => {
    // console.log("Component Changed", e);
    setCode(e);
  };
  return (
    <Grid container>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-end"
      >
        <Grid item xs={8}>
          <TextField
            className={classes.textField}
            label="Title"
            margin="normal"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={2}>
         <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={()=>{
            var obj = {
                'title': title,
                'code': props.code
            };
            if(props.id == null)
            {
                props.firebase.addNote(obj).then(res =>{
                    console.log("[SUCCESS]",  res);

                    

                    }).catch(err=>{
                    console.log("[ERROR]",err);
                    
                    })
            }
            else
            {
                props.firebase.addToNote(props.id, obj).then(res =>{
                    console.log("[SUCCESS]",  res);

                    

                    }).catch(err=>{
                    console.log("[ERROR]",err);
                    
                    })
            }
        }}
        className={classes.button}
        startIcon={<SaveIcon />}
      >
        Save
      </Button>
        </Grid>
      </Grid>

      <Grid container xs={12}   justify="space-between" alignItems="center">
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Mode</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={mode}
            onChange={e => {
              setMode(e.target.value);
            }}
          >
            {languages.map((value, index) => {
              return <MenuItem value={value}>{value}</MenuItem>;
            })}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Theme</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={theme}
            onChange={e => {
              setTheme(e.target.value);
            }}
          >
            {themes.map((value, index) => {
              return <MenuItem value={value}>{value}</MenuItem>;
            })}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">fontSize</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={fontSize}
            onChange={e => {
              setFontSize(e.target.value);
            }}
          >
            {fontSizes.map((value, index) => {
              return <MenuItem value={value}>{value}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Grid>

      {/* <Grid item xs={12}>
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={basicAutocomplete}
              onChange={() => {
                setBasicAutocomplete(!basicAutocomplete);
              }}
            />
          }
          label="Basic Autocomplete"
        />

        <FormControlLabel
          control={
            <GreenCheckbox
              checked={liveAutocomplete}
              onChange={() => {
                setLiveAutocomplete(!liveAutocomplete);
              }}
            />
          }
          label="Live Autocomplete"
        />

        <FormControlLabel
          control={
            <GreenCheckbox
              checked={printMargin}
              onChange={() => {
                setPrintMargin(!printMargin);
              }}
            />
          }
          label="Show Print Margin"
        />

        <FormControlLabel
          control={
            <GreenCheckbox
              checked={gutter}
              onChange={() => {
                setGutter(!gutter);
              }}
            />
          }
          label="Show Gutter"
        />
      </Grid>

      <Grid item xs={12}>
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={activeLine}
              onChange={() => {
                setActiveLine(!activeLine);
              }}
            />
          }
          label="Highlight Active Line"
        />
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={enableSnippets}
              onChange={() => {
                setEnableSnippets(!enableSnippets);
              }}
            />
          }
          label="Enable Snippets"
        />

        <FormControlLabel
          control={
            <GreenCheckbox
              checked={lineNumbers}
              onChange={() => {
                setLineNumbers(!lineNumbers);
              }}
            />
          }
          label="Show Line Numbers"
        />
      </Grid> */}

      <AceEditor
        placeholder="Placeholder Text"
        mode={mode}
        theme={theme}
        name="blah2"
        onLoad={onload}
        onChange={onchange}
        fontSize={fontSize}
        showPrintMargin={printMargin}
        showGutter={gutter}
        highlightActiveLine={activeLine}
        value={code}
        width="100%"
        // height="100vh"
        setOptions={{
          enableBasicAutocompletion: { basicAutocomplete },
          enableLiveAutocompletion: { liveAutocomplete },
          enableSnippets: { enableSnippets },
          showLineNumbers: { lineNumbers },
          tabSize: 4,
        }}
      />
    </Grid>
  );
};

export default withFirebase(Editor);

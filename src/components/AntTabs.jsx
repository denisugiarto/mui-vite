import { AppBar, Box, Tabs, Typography, Tab } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";


export function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box width="100%" p={0} bgcolor="#fff" boxShadow={'3px 3px -3px #ddd'}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export const AntTabs = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.type === 'dark' ? '#1D5174' : "#112B3D",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    color: '#fff'
  },
  indicator: {
    backgroundColor: "#02aaec",
  },
}))(props => <Tabs variant="scrollable"
  scrollButtons="on"
  indicatorColor="primary"
  textColor="primary"
  aria-label="scrollable force tabs example"  {...props} />);

  export const AntTabs2 = withStyles(theme => ({
    root: {
      backgroundColor: theme.palette.type === 'dark' ? '#1D5174' : "#fff",
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      color: '#fff'
      
    },
    indicator: {
      backgroundColor: "#02aaec",
    },
  }))(props => <Tabs variant="scrollable"
    scrollButtons="on"
    indicatorColor="primary"
    textColor="primary"
    aria-label="scrollable force tabs example"  {...props} />);

export const AntAppBar = withStyles({
  root: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
})(AppBar);

export const AntTab = withStyles((theme) => ({
  root: {
    // flexGrow: 1,
    // width: '100%',
    textTransform: "none",
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    color: theme.palette.common.white,
    height: theme.spacing(7.5),
    fontSize: theme.spacing(2),
    "&:hover": {
      // color: "rgba(2, 170, 236, 0.8)",
      opacity: 1,
    },
    "&$selected": {
      color: "#02aaec",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:focus": {
      color: "#02aaec",
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

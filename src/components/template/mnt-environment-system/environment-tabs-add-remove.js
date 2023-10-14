import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TreeViewOptionsEmployeed from 'src/components/organism/tree-view-options-employeed';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function EnvironmentTabsAddRemove({
  options = [],
  optionsItem = [],
  optionsAdd = [],
  optionsItemAdd = [],
  handleChange,
  value = 0,
  handleRemoveItemListEmployeed
}) {

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Por Eliminar" {...a11yProps(0)} />
          <Tab label="Por Agregar" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <TreeViewOptionsEmployeed
          options={options}
          optionsItem={optionsItem}
          handleRemoveItemListEmployeed={handleRemoveItemListEmployeed}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TreeViewOptionsEmployeed
          options={optionsAdd}
          optionsItem={optionsItemAdd}
          handleRemoveItemListEmployeed={handleRemoveItemListEmployeed}
        />
      </CustomTabPanel>
    </Box>
  );
}
EnvironmentTabsAddRemove.propTypes = {
  options: PropTypes.array,
  optionsAdd: PropTypes.array,
  optionsItem: PropTypes.array,
  optionsItemAdd: PropTypes.array,
  handleChange: PropTypes.func,
  handleRemoveItemListEmployeed: PropTypes.func,
  value: PropTypes.number,
};
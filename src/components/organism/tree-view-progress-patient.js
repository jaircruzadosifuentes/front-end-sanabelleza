import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import EmergencyRecordingIcon from '@mui/icons-material/EmergencyRecording';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import Inventory2Icon from '@mui/icons-material/Inventory2';
const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: 'var(--tree-view-color)',
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit',
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

function StyledTreeItem(props) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

export default function GmailTreeView({
  handleChangeTreViewSelect
}) {
  return (
    <TreeView
      aria-label="gmail"
      defaultSelected={['1']}
      defaultExpanded={['3']}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      sx={{ height: 270, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
      onNodeSelect={handleChangeTreViewSelect}
    >
      <StyledTreeItem nodeId="1" labelText="Ver Grabación" labelIcon={EmergencyRecordingIcon} />
      <StyledTreeItem nodeId="2" labelText="Ver Documentos Adjuntos" labelIcon={DocumentScannerIcon} />
      <StyledTreeItem nodeId="3" labelText="Datos del Paciente" labelIcon={HistoryEduIcon}>
        <StyledTreeItem
          nodeId="5"
          labelText="Diagnóstico Clínico"
          labelIcon={SettingsAccessibilityIcon}
          labelInfo=""
          color="#1a73e8"
          bgColor="#e8f0fe"
        />
        <StyledTreeItem
          nodeId="6"
          labelText="Detalle el Paciente"
          labelIcon={PersonIcon}
          labelInfo=""
          color="#e3742f"
          bgColor="#fcefe3"
        />
        <StyledTreeItem
          nodeId="7"
          labelText="Paquete y Frecuencia"
          labelIcon={Inventory2Icon}
          labelInfo=""
          color="#e3742f"
          bgColor="#fcefe3"
        />
      </StyledTreeItem>
    </TreeView>
  );
}
GmailTreeView.propTypes = {
  handleChangeTreViewSelect: PropTypes.func,
};
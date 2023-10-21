import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import LabelIcon from '@mui/icons-material/Label';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import GroupIcon from '@mui/icons-material/Group';
import PaymentsIcon from '@mui/icons-material/Payments';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import { Tooltip } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AssignmentIcon from '@mui/icons-material/Assignment';

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

export const GetIconBasedOnComponent = (name) => {
  const ICON_COMPONENTS = {
    'AppRegistrationIcon': AppRegistrationIcon,
    'GroupIcon': GroupIcon,
    'Inventory2Icon': Inventory2Icon,
    'PaymentsIcon': PaymentsIcon,
    'PointOfSaleIcon': PointOfSaleIcon,
    'SettingsSuggestIcon': SettingsSuggestIcon,
    'AccountBalanceIcon': AccountBalanceIcon,
    'AssignmentIcon': AssignmentIcon,
  }
  const ICON_DEFAULT_COMPONENT = AppRegistrationIcon
  return ICON_COMPONENTS[name] || ICON_DEFAULT_COMPONENT;
}

export default function TreeViewOptionsEmployeed({
  options = [],
  optionsItem = [],
  handleChangeTreViewSelect,
  handleRemoveItemListEmployeed
}) {
  return (
    <TreeView
      aria-label="gmail"
      defaultSelected={[2, 3]}
      defaultExpanded={[2, 3]}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      sx={{ height: '100%', flexGrow: 1, maxWidth: '100%', overflowY: 'auto' }}
    >
      {
        options.map((o, index) => {
          return (
            <>
              <StyledTreeItem key={index} nodeId={o.optionId} labelText={o.name} labelIcon={GetIconBasedOnComponent(o.icon)}>
                {
                  optionsItem.map((i) => {
                    if(o.optionId === i.option.optionId) {
                      return (
                        <>
                          <StyledTreeItem
                            labelText={i.name}
                            labelIcon={LabelIcon}
                            labelInfo={
                              <>
                                <Tooltip  onClick={(e) =>handleRemoveItemListEmployeed(e, i, o)}>
                                  <RemoveCircleIcon />
                                </Tooltip>
                              </>
                            }
                            color="#1a73e8"
                            bgColor="#e8f0fe"
                          />
                        </>
                      )
                    }
                  })
                }
              </StyledTreeItem>
            </>
          )
        })
      }
      {/* <StyledTreeItem nodeId="2" labelText="Ver Documentos Adjuntos" labelIcon={LabelIcon} />
      <StyledTreeItem nodeId="3" labelText="Datos del Paciente" labelIcon={LabelIcon}>
        <StyledTreeItem
          nodeId="5"
          labelText="Diagnóstico Clínico"
          labelIcon={TurnedInNotIcon}
          labelInfo=""
          color="#1a73e8"
          bgColor="#e8f0fe"
        />
        <StyledTreeItem
          nodeId="6"
          labelText="Detalle el Paciente"
          labelIcon={TurnedInNotIcon}
          labelInfo=""
          color="#e3742f"
          bgColor="#fcefe3"
        />
        <StyledTreeItem
          nodeId="7"
          labelText="Paquete y Frecuencia"
          labelIcon={TurnedInNotIcon}
          labelInfo=""
          color="#e3742f"
          bgColor="#fcefe3"
        />
      </StyledTreeItem> */}
    </TreeView>
  );
}
TreeViewOptionsEmployeed.propTypes = {
  handleChangeTreViewSelect: PropTypes.func,
  handleRemoveItemListEmployeed: PropTypes.func,
  options: PropTypes.array,
  optionsItem: PropTypes.array,
};

import pascalcase from 'pascalcase';
import pluralize from "pluralize";


export default function getListPage(module, model){
    const single = module;
    const plural = pluralize(single);
  
    const pascalSingle = pascalcase(single, {pascalCase: true});
    const pascalPlural = pascalcase(plural, {pascalCase: true});
  
    const displayColumns = model.listFields;

    const cols = [];
    
    displayColumns.forEach(it => {
        const pascalFieldName = pascalcase(it, {pascalCase: true});
        cols.push(`{ headerName: t(${pascalFieldName}), field: ${it}, width: 200 }`)
    });

    cols.push(
    `{ headerName: t("Actions"),
        field: "_id",
        width: 180,
        renderCell: (params) => {
          return (
            <ButtonWidget
              size="small"
              onClick={() => {
                const ${single}Id = params.row._id;
                navigate("/${plural}/" + ${single}Id);
              }}
            >
              {t("View Details")}
            </ButtonWidget>
          );
        },
    }`
    );

    return `
    import React, { useEffect, useState } from "react";
    import { useTranslation } from "react-i18next";
    import { useDispatch, useSelector } from "react-redux";
    import { useNavigate } from "react-router-dom";

    import ButtonWidget from "../../components/common/Button";
    import { DialogId, Path } from "../../const";
    import CardWidget from "../../layout/Card";
    import Content from "../../layout/Content";
    
    import { selectSignedInUser } from "../../redux/account/account.selector";
    import { setSignedInUser } from "../../redux/account/account.slice";
    import { selectBreadcrumb } from "../../redux/layout/layout.selector";
    import { setBreadcrumb, setDialog, setSnackbar } from "../../redux/layout/layout.slice";
    import { select${pascalPlural} } from "../../redux/${single}/${single}.selector";
    import { set${pascalPlural} } from "../../redux/${single}/${single}.slice";
    
    import { delete${pascalSingle}, fetch${pascalPlural} } from "../../services/api";
    import { debounce } from "../../utils";
    import theme from "../../theme";
    import SearchBar from "../../components/SearchBar";
    import GridTable from "../../components/common/GridTable";
    import { RefreshButton } from "../../components/common/IconButton";
    import Delete${pascalSingle}Dialog from "./Delete${pascalSingle}Dialog";
    import PageTitle from "../../components/PageTitle";
    
    const mStyles = {
      root: {
        width: "100%",
      },
      formControl: {
        width: "100%",
        marginBottom: 15,
      },
      row: {
        width: "100%",
        marginBottom: "8px",
        display: 'flex',
      },
      searchBar: { root: { width: 'calc(100% - 68px)' } },
      card: { root: { width: theme.card.width } },
      table: { root: { height: theme.table.height } }
    };
    
    export default function ${pascalSingle}ListPage() {
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const { t } = useTranslation();
    
      const ${plural} = useSelector(select${pascalPlural});
      const signedInUser = useSelector(selectSignedInUser);
      const breadcrumb = useSelector(selectBreadcrumb);
    
      const [selectedItem, setSelectedItem] = useState();
      const [keyword, setKeyword] = useState();
      const [actions, setActions] = useState();
    
      const columns = [
        ${cols.join(",")}
      ];
    
      const createButton =
      {
        label: t("Create ${pascalSingle}"),
        variant: "contained",
        onClick: () => {
          navigate("/${plural}/new/form");
        },
      };
    
      useEffect(() => {
        dispatch(setBreadcrumb([
          {
            id: Path.Manage${pascalPlural},
            label: t("${pascalPlural}"),
          }
        ]));
      }, []);
    
      useEffect(() => {
        if (selectedItem) {
          setActions([
            {
              label: t("Delete"),
              onClick: () => {
                dispatch(setDialog({ show: true, id: DialogId.Delete${pascalSingle}, params: { ${single}: selectedItem } }))
              },
            },
            createButton,
          ])
        } else {
          setActions([createButton])
        }
      }, [selectedItem]);
    
      const handleSelect${pascalSingle} = (row) => {
        setSelectedItem(row);
      }
    
      const load${pascalPlural} = (keyword, signedInUser) => {
        const query = get${pascalSingle}ListQuery(keyword, signedInUser);
        fetch${pascalPlural}(query).then((r) => {
          if (r && r.status === 200) {
            dispatch(set${pascalPlural}(r.data));
          } else {
            dispatch(setSignedInUser());
          }
        });
      }
    
      const fetch${pascalPlural}Delay = debounce(load${pascalPlural}, 500);
    
      useEffect(() => {
        if (signedInUser) {
          fetch${pascalPlural}Delay(keyword, signedInUser);
        }
      }, [signedInUser, keyword]);
    
      const handleSearch = (keyword) => {
        if (signedInUser) {
          load${pascalPlural}(keyword, signedInUser);
        }
      };
    
      const handleClearSearch = () => {
        setKeyword();
      }
    
      const handleKeywordChange = (v) => {
        setKeyword(v);
      }
    
      const handleRefresh = () => {
        if (signedInUser) {
          load${pascalPlural}(keyword, signedInUser);
        }
      }
    
      const handleDelete${pascalSingle} = ({ ${single} }) => {
        delete${pascalSingle}(${single}._id).then(r => {
          const removed = r.data;
          const remain = ${plural}.filter(it => it._id !== removed._id);
          dispatch(set${pascalPlural}(remain));
          if (remain.length === 0) {
            setSelectedItem();
          }
          dispatch(setSnackbar({ show: true, text: "Delete ${single} successfully." }));
          dispatch(setDialog({ show: false }));
        });
      }
    
      return (
        <Content style={mStyles.root} breadcrumbs={breadcrumb}>
          <PageTitle
            title={t("Manage ${pascalPlural}")}
          />
          <CardWidget
            buttons={actions}
            data={selectedItem}
            styles={mStyles.card}
          >
            <div style={{ width: "100%", padding: 10 }}>
              <div style={mStyles.row}>
                <SearchBar keyword={keyword} onChange={handleKeywordChange} onClear={handleClearSearch} onSearch={handleSearch} styles={mStyles.searchBar} />
                <RefreshButton onClick={handleRefresh} />
              </div>
              {${plural} && ${plural}.length > 0 ?
                <GridTable
                  data={${plural}.map(p => ({ ...p, id: p._id }))}
                  columns={columns}
                  onRowClick={handleSelect${pascalSingle}}
                  rowsPerPage={15}
                  styles={mStyles.table}
                />
                :
                (
                  <div style={{ width: "100%" }}>
                    No ${pascalSingle} found
                  </div>
                )
              }
            </div>
    
          </CardWidget>
          <Delete${pascalSingle}Dialog
            onClose={() => dispatch(setDialog({ show: false }))}
            onOk={handleDelete${pascalSingle}}
          />
        </Content>
      );
    }
    `
}

// const get${pascalSingle}ListQuery = (keyword, signedInUser) => {
//     if (isAdminAccount(signedInUser) || isDrawingEngineer(signedInUser)) {
//       return keyword ? { keyword } : {};
//     } else if (isEmployee(signedInUser)) {
//       const roleName = signedInUser.role.name;
//     //   const query = { [`${roleName}Id`]: signedInUser.id }
//       return keyword ? { keyword, ...query } : query;
//     } else {
//       return null;
//     }
//   }


export default function getListComponent(moduleName, entity){
    return `  
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { setSnackbar } from "../../redux/layout/layout.slice";
import { 
    fetch${entity.pascalPlural},
    fetch${entity.pascalSingle},
    delete${entity.pascalSingle}
} from "../../redux/${moduleName}/${moduleName}.thunk";
import { select${entity.pascalPlural} } from "../../redux/${moduleName}/${moduleName}.selector";

export default function ${entity.pascalSingle}List() {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const ${entity.plural} = useSelector(select${entity.pascalPlural});

    const handleFetch${entity.pascalPlural} = (query) => {
        dispatch(fetch${entity.pascalPlural}(query))
        .unwrap()
        .then((originalPromiseResult) => {
        })
        .catch((rejectedValueOrSerializedError) => {
        })
    }

    const handleFetch${entity.pascalSingle} = (_id) => {
        dispatch(fetch${entity.pascalSingle}(_id))
        .unwrap()
        .then((originalPromiseResult) => {
        })
        .catch((rejectedValueOrSerializedError) => {
        })
    }

    const handleDelete${entity.pascalSingle} = (_id) => {
        dispatch(delete${entity.pascalSingle}({_id}))
        .unwrap()
        .then((originalPromiseResult) => {
            dispatch(setDialog({show: false}));
            dispatch(setSnackbar({ show: true, text: t("Delete ${entity.single} successfully") }));
        })
        .catch((rejectedValueOrSerializedError) => {
            dispatch(setDialog({show: false}));
            dispatch(setSnackbar({ show: true, text: t("Delete ${entity.single} failed") }));
        })
    }

    return <></>;
}
    `
}

// export default function getListComponents(module){
//     const entities = module.entities.map(it => {
//         return getEntity(it);
//     });

//     const forms = [];

//     entities.forEach(entity => {
//         forms.push(getListComponent(module.name, entity))
//     });

// }

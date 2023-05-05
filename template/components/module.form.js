

export default function getFormComponent(moduleName, entity){
    return `  
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { setSnackbar } from "../../redux/layout/layout.slice";
import { 
    create${entity.pascalSingle},
    update${entity.pascalSingle}
} from "../../redux/${moduleName}/${moduleName}.thunk";
import { select${entity.pascalSingle} } from "../../redux/${moduleName}/${moduleName}.selector";

export default function ${entity.pascalSingle}Form() {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const ${entity.single} = useSelector(select${entity.pascalSingle});

    const handleCreate${entity.pascalSingle} = (d) => {
        dispatch(create${entity.pascalSingle}(d))
        .unwrap()
        .then((originalPromiseResult) => {
            dispatch(setSnackbar({ show: true, text: t("Create ${entity.single} successfully") }));
        })
        .catch((rejectedValueOrSerializedError) => {
            dispatch(setSnackbar({ show: true, text: t("Create ${entity.single} failed") }));
        })
    }

    const handleUpdate${entity.pascalSingle} = (_id, d) => {
        if(d._id){
            delete d._id;
        }

        dispatch(update${entity.pascalSingle}({_id, data: d}))
        .unwrap()
        .then((originalPromiseResult) => {
            dispatch(setSnackbar({ show: true, text: t("Update ${entity.single} successfully") }));
        })
        .catch((rejectedValueOrSerializedError) => {
            dispatch(setSnackbar({ show: true, text: t("Update ${entity.single} failed") }));
        })
    }

    return <></>;
}
    `
}

// export default function getFormComponents(module){
//     const entities = module.entities.map(it => {
//         return getEntity(it);
//     });

//     const forms = [];

//     entities.forEach(entity => {
//         forms.push(getFormComponent(module.name, entity))
//     });

// }

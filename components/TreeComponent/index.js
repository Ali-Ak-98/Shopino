import ConfigContext from '../context'
import RecursiveComponent from "../RecursiveComponent";
import useTreeState from 'use-tree-state';

function TreeComponent({data, onChange, onNameClick = null, initCheckedStatus = 'unchecked', initOpenStatus = 'open'}) {
    const options = {
        initCheckedStatus,
        initOpenStatus,
    };
    const {treeState, reducers} = useTreeState({data, options, onChange});
    const {
        checkNode,
        renameNode,
        deleteNode,
        addNode,
        toggleOpen,
    } = reducers;

    if (!treeState) return null;

    const configs = {
        handleCheck: checkNode,
        handleRename: renameNode,
        handleDelete: deleteNode,
        handleAddNode: addNode,
        handleToggleOpen: toggleOpen,
        onNameClick,
    };


    return (
        <div className={'FolderTree'}>
            <ConfigContext.Provider value={configs}>
                <RecursiveComponent
                    path={[]}
                    {...treeState}
                />
            </ConfigContext.Provider>
        </div>
    );
}

export default TreeComponent

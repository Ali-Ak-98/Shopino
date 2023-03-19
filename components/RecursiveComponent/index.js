import {useContext, useState} from "react";
import ConfigContext from '../context'
import {
    BsFolderPlus,
    BsFillTrashFill,
    BsFillFileEarmarkPlusFill,
    BsXLg,
    BsFillPlusCircleFill,
    BsPatchMinusFill
} from "react-icons/bs";


const RecursiveComponent = ({
                                path,
                                name,
                                checked,
                                isOpen,
                                children,
                                ...restData
                            }) => {

    const nodeData = {
        path, name, checked, isOpen, ...restData,
    };

    const {
        handleDelete,
        handleAddNode,
        handleToggleOpen,
        onNameClick,
    } = useContext(ConfigContext);

    const isFolder = !!children;

    const [isSelected, setIsSelected] = useState(false);

    const selectMe = () => (setIsSelected(true));
    const unSelectMe = () => setIsSelected(false);

    const openMe = () => handleToggleOpen(path, true);
    const closeMe = () => handleToggleOpen(path, false);

    const deleteMe = () => handleDelete(path);

    const addFile = () => handleAddNode(path, false);
    const addFolder = () => handleAddNode(path, true);

    const handleNameClick = () => {
        const defaultOnClick = selectMe;
        if (onNameClick && typeof onNameClick === 'function') {
            !isEditing && onNameClick({defaultOnClick, nodeData});
        } else {
            defaultOnClick();
        }
    };

    const TreeNodeToolBar = (
        <div className={'flex space-x-5 items-center bg-blue-100 rounded p-1 ml-5'}>
            <div className='cursor-pointer' onClick={deleteMe}>
                <BsFillTrashFill/>
            </div>
            {
                isFolder && (
                    <>
                        <div
                            className={'cursor-pointer'}
                            onClick={addFile}>
                            <BsFillFileEarmarkPlusFill/>
                        </div>
                        <div
                            className={'cursor-pointer'}
                            onClick={addFolder}>
                            <BsFolderPlus/>
                        </div>
                    </>
                )
            }

            <div
                className={'cursor-pointer'}
                onClick={unSelectMe}
            >
                <BsXLg/>
            </div>
        </div>
    );

    const folderCaret = (
        <span className={'flex items-center mr-2'}>
        {
            isOpen
                ? (
                    <BsPatchMinusFill
                        className={'cursor-pointer'}
                        onClick={closeMe}
                    />
                )
                : (
                    <BsFillPlusCircleFill
                        className={'cursor-pointer'}
                        onClick={openMe}
                    />
                )
        }
        </span>
    );


    return (
        <>
            <div className={'flex pl-5'}>
                {isFolder && folderCaret}

                <div onClick={handleNameClick} className={'cursor-pointer'}>
                    {nodeData.name}
                </div>

                {isSelected && TreeNodeToolBar}
            </div>

            {
                isFolder && isOpen && children.map((data, idx) => (
                    <div key={idx} className={'pl-5'}>
                        <RecursiveComponent
                            key={data._id}
                            path={[...path, idx]}
                            {...data}
                        />
                    </div>
                ))
            }
        </>
    );
};

export default RecursiveComponent

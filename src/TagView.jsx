import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Plus } from 'lucide-react';

const TagView = ({ tag, onUpdate }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(tag.name);

  const handleToggleCollapse = () => setIsCollapsed(!isCollapsed);

  const handleDataChange = (e) => {
    onUpdate({ ...tag, data: e.target.value });
  };

  const handleAddChild = () => {
    const newChild = { name: 'New Child', data: 'Data' };
    if (tag.data !== undefined) {
      onUpdate({ ...tag, children: [newChild], data: undefined });
    } else {
      onUpdate({ ...tag, children: [...(tag.children || []), newChild] });
    }
  };

  const handleNameEdit = () => {
    setIsEditingName(true);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNameSubmit = (e) => {
    if (e.key === 'Enter') {
      onUpdate({ ...tag, name: newName });
      setIsEditingName(false);
    }
  };

  return (
    <div className="border rounded-lg p-3 my-3 shadow-sm bg-white">
      <div className="flex items-center mb-2">
        <button onClick={handleToggleCollapse} className="mr-2 hover:text-blue-500">
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronDown size={20} />}
        </button>
        {isEditingName ? (
          <input
            value={newName}
            onChange={handleNameChange}
            onKeyPress={handleNameSubmit}
            className="form-input border-gray-300 rounded px-2"
            autoFocus
          />
        ) : (
          <span onClick={handleNameEdit} className="cursor-pointer text-blue-600 font-semibold">
            {tag.name}
          </span>
        )}
        <button onClick={handleAddChild} className="ml-auto hover:bg-blue-100 p-1 rounded">
          <Plus size={20} /> Add Child
        </button>
      </div>
      {!isCollapsed && (
        <>
          {tag.data !== undefined ? (
            <input
              value={tag.data}
              onChange={handleDataChange}
              className="w-full form-input border-gray-300 rounded px-2 py-1"
            />
          ) : (
            tag.children?.map((child, index) => (
              <TagView
                key={index}
                tag={child}
                onUpdate={(updatedChild) => {
                  const newChildren = [...tag.children];
                  newChildren[index] = updatedChild;
                  onUpdate({ ...tag, children: newChildren });
                }}
              />
            ))
          )}
        </>
      )}
    </div>
  );
};

const NestedTagsTree = () => {
  const [tree, setTree] = useState({
    name: 'root',
    data: 'Root Data',
  });

  const [exportedDivData, setExportedDivData] = useState(null);

  const handleExport = () => {
    const exportData = (node) => {
      const exported = { name: node.name };
      if (node.data !== undefined) {
        exported.data = node.data;
      } else if (node.children) {
        exported.children = node.children.map(exportData);
      }
      return exported;
    };
    
    const exportedTree = exportData(tree);
    console.log(JSON.stringify(exportedTree, null, 2));
    setExportedDivData(JSON.stringify(exportedTree, null, 2));
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <TagView
        tag={tree}
        onUpdate={setTree}
      />
      <button onClick={handleExport} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow">
        Export
      </button>
      <div className="mt-2 p-2 bg-white rounded shadow-md">
        <pre>{exportedDivData}</pre>
      </div>
    </div>
  );
};

export default NestedTagsTree;

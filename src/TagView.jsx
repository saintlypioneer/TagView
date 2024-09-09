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
    <div className="border rounded p-2 my-2">
      <div className="flex items-center mb-2">
        <button onClick={handleToggleCollapse} className="mr-2">
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
        </button>
        {isEditingName ? (
          <input
            value={newName}
            onChange={handleNameChange}
            onKeyPress={handleNameSubmit}
            className="border rounded px-1"
            autoFocus
          />
        ) : (
          <span onClick={handleNameEdit} className="cursor-pointer text-blue-600 font-bold">
            {tag.name}
          </span>
        )}
        <button onClick={handleAddChild} className="ml-auto">
          <Plus size={16} /> Add Child
        </button>
      </div>
      {!isCollapsed && (
        <>
          {tag.data !== undefined ? (
            <input
              value={tag.data}
              onChange={handleDataChange}
              className="w-full border rounded px-2 py-1"
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
    children: [
      {
        name: 'child1',
        children: [
          { name: 'child1-child1', data: 'c1-c1 Hello' },
          { name: 'child1-child2', data: 'c1-c2 JS' }
        ]
      },
      { name: 'child2', data: 'c2 World' }
    ]
  });

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
    alert("Exported data logged to console");
  };

  return (
    <div className="p-4">
      <TagView
        tag={tree}
        onUpdate={setTree}
      />
      <button onClick={handleExport} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Export
      </button>
    </div>
  );
};

export default NestedTagsTree;
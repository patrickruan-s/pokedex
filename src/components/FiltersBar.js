import React, {useState, useEffect} from 'react';
import { Toolbar } from "radix-ui";
const FiltersBar = (props) => {
    return(    
        <Toolbar.Root className="ToolbarRoot" aria-label="Formatting options">
		<Toolbar.ToggleGroup type="multiple" aria-label="Text formatting">
			<Toolbar.ToggleItem
				className="ToolbarToggleItem"
				value="bold"
				aria-label="Bold"
			>
			</Toolbar.ToggleItem>
		</Toolbar.ToggleGroup>
		<Toolbar.Separator className="ToolbarSeparator" />
		<Toolbar.ToggleGroup
			type="single"
			defaultValue="center"
			aria-label="Text alignment"
		>
			<Toolbar.ToggleItem
				className="ToolbarToggleItem"
				value="left"
				aria-label="Left aligned"
			>
			</Toolbar.ToggleItem>
		</Toolbar.ToggleGroup>
		<Toolbar.Separator className="ToolbarSeparator" />
		<Toolbar.Link
			className="ToolbarLink"
			href="#"
			target="_blank"
			style={{ marginRight: 10 }}
		>
			Edited 2 hours ago
		</Toolbar.Link>
		<Toolbar.Button className="ToolbarButton" style={{ marginLeft: "auto" }}>
			Share
		</Toolbar.Button>
	</Toolbar.Root>
    );
}

export default FiltersBar;
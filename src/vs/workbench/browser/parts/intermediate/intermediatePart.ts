/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import './media/intermediatePart.css';
import { IThemeService } from '../../../../platform/theme/common/themeService.js';
import { IStorageService } from '../../../../platform/storage/common/storage.js';
import { IWorkbenchLayoutService, Parts } from '../../../services/layout/browser/layoutService.js';
import { Part } from '../../part.js';
import { LayoutPriority } from '../../../../base/browser/ui/splitview/splitview.js';
import { SIDE_BAR_BACKGROUND, SIDE_BAR_BORDER } from '../../../common/theme.js';
import { InstantiationType, registerSingleton } from '../../../../platform/instantiation/common/extensions.js';
import { createDecorator } from '../../../../platform/instantiation/common/instantiation.js';

export const IIntermediatePartService = createDecorator<IIntermediatePartService>('intermediatePartService');

export interface IIntermediatePartService {
	readonly _serviceBrand: undefined;
}

export class IntermediatePart extends Part implements IIntermediatePartService {

	declare readonly _serviceBrand: undefined;

	static readonly ID = 'workbench.parts.intermediate';
	static readonly DEFAULT_MIN_WIDTH = 100;
	static readonly DEFAULT_MAX_WIDTH = 400;

	//#region IView

	readonly minimumWidth: number = IntermediatePart.DEFAULT_MIN_WIDTH;
	readonly maximumWidth: number = IntermediatePart.DEFAULT_MAX_WIDTH;
	readonly minimumHeight: number = 0;
	readonly maximumHeight: number = Number.POSITIVE_INFINITY;

	readonly priority = LayoutPriority.Low;

	//#endregion
	constructor(
		@IThemeService themeService: IThemeService,
		@IStorageService storageService: IStorageService,
		@IWorkbenchLayoutService layoutService: IWorkbenchLayoutService
	) {
		super(Parts.INTERMEDIATE_PART, { hasTitle: false }, themeService, storageService, layoutService);
	}
	protected override createContentArea(parent: HTMLElement): HTMLElement {
		// Set the element property required by ISerializableView
		this.element = parent;

		// Set up the parent element with our styles
		parent.classList.add('intermediate-part-content');

		// Add some placeholder content
		const placeholderText = document.createElement('div');
		// placeholderText.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed nulla eleifend, feugiat eros et, ornare tellus. Pellentesque fermentum ex sed nunc eleifend, ac cursus lectus porttitor. Cras eu felis nec est faucibus aliquet vitae nec velit. Quisque vitae elementum nulla. In ut aliquam massa. Mauris nec turpis vitae nisi commodo lacinia vitae a felis. Donec consectetur justo dui, id commodo nisl lobortis sit amet. Vivamus pretium risus eget congue sollicitudin. Nullam sagittis, felis id suscipit imperdiet, ipsum libero porta orci, at viverra risus enim vel ipsum. Mauris lacinia cursus mollis. Donec velit elit, tempor luctus rutrum vel, venenatis ac libero.Mauris semper feugiat mi, nec lobortis risus vehicula id. Integer malesuada tempus magna non scelerisque. In facilisis felis vel diam pharetra, vestibulum tincidunt felis ultricies. Nullam et scelerisque sem, et porttitor nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus nulla magna, pellentesque et massa vel, imperdiet dapibus magna. Mauris a feugiat arcu, non tristique mauris. Nam efficitur facilisis finibus. Suspendisse purus lectus, aliquet sit amet scelerisque non, viverra id diam.Aenean sagittis efficitur metus, a ultrices enim mollis vel. Vestibulum vel mi vehicula, ultricies lacus eu, scelerisque lectus. Maecenas urna lacus, bibendum id purus mollis, egestas eleifend odio. Integer semper enim est, id dictum nisl pretium quis. Vivamus sit amet metus leo. Pellentesque eleifend, augue ut rhoncus dapibus, nibh leo sagittis arcu, vel iaculis nisi turpis in nulla. Nulla dictum, dolor et posuere sagittis, odio ligula ultrices lectus, in maximus erat dolor in mauris. Nam in faucibus metus. Suspendisse nec vulputate justo, ac rutrum elit. Mauris rhoncus volutpat erat. Proin sollicitudin feugiat consectetur. Nunc euismod vulputate pulvinar.Pellentesque urna purus, hendrerit sit amet sapien et, placerat tincidunt nibh. Vestibulum auctor feugiat venenatis. Duis dapibus mattis ex ac eleifend. Nam massa libero, sagittis a ullamcorper vel, dapibus nec ipsum. Phasellus quis feugiat massa. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam libero enim, accumsan vel elementum et, consectetur non neque. Sed nec semper eros. Morbi sit amet ante elementum, convallis dolor quis, suscipit enim. Donec ultrices augue lectus, a laoreet magna egestas sit amet. Pellentesque ullamcorper purus a mattis mattis. Ut congue urna tellus.Cras euismod, massa vel pellentesque maximus, neque orci feugiat mi, vel gravida enim purus lobortis lectus. Fusce vitae dolor vel mi mollis suscipit vitae ac massa. Duis vehicula ultricies purus ornare elementum. Nunc eros dui, maximus aliquam quam et, suscipit volutpat nulla. Cras ac dolor ut tortor scelerisque lacinia at quis nisl. Pellentesque dolor risus, imperdiet id turpis in, rhoncus consequat justo. Sed id arcu suscipit, ornare nisl non, tempus magna. Donec imperdiet suscipit magna sit amet varius. Sed sodales volutpat leo pharetra pharetra. Integer vulputate ipsum eget nisi feugiat, tristique congue ipsum ullamcorper. Ut in molestie velit. Praesent pellentesque hendrerit eros ut blandit. In efficitur luctus est id feugiat. Nulla suscipit libero eu gravida viverra. Vestibulum vitae nibh quis ex blandit viverra sit amet sit amet purus. Pellentesque commodo ligula in orci gravida, vel posuere lectus vestibulum.";
		placeholderText.textContent="New Part Placeholder";
		placeholderText.classList.add('intermediate-placeholder');

		parent.appendChild(placeholderText);

		return parent;
	}

	override updateStyles(): void {
		super.updateStyles();

		const container = this.getContainer();
		if (container) {
			container.style.backgroundColor = this.getColor(SIDE_BAR_BACKGROUND) || '';
			container.style.borderRightColor = this.getColor(SIDE_BAR_BORDER) || '';
		}
	}

	override layout(width: number, height: number, top: number, left: number): void {
		super.layout(width, height, top, left);
	}

	toJSON(): object {
		return {
			type: Parts.INTERMEDIATE_PART
		};
	}
}

// Register the IntermediatePart as a service
registerSingleton(IIntermediatePartService, IntermediatePart, InstantiationType.Eager);

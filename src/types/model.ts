export type namespaced = 
	| `${string}:${'block' | 'item'}/${string}`
	| `${'block' | 'item'}/${string}`
	;

export type position =
	| 'thirdperson_righthand'
	| 'thirdperson_lefthand'
	| 'firstperson_righthand'
	| 'firstperson_lefthand'
	| 'gui'
	| 'head'
	| 'ground'
	| 'fixed'
	;

export type predicate = 
	| 'angle'
	| 'blocking'
	| 'broken'
	| 'cast'
	| 'cooldown'
	| 'damage'
	| 'damaged'
	| 'lefthanded'
	| 'pull'
	| 'pulling'
	| 'charged'
	| 'firework'
	| 'throwing'
	| 'time'
	| 'custom_model_data'
	| 'level'
	| 'filled'
	| 'tooting'
	| 'trim_type'
	| 'brushing'
	| 'honey_level'
	;
	
export interface BlockModelType {
	parent?: 'builtin/generated' | namespaced;
	ambientocclusion?: boolean;
	display?: Partial<Record<position, {
		rotation?: [number, number, number];
		translation?: [number, number, number];
		scale?: [number, number, number];
	}>>;

	textures?: Record<string | 'particules', namespaced>;

	elements?: {
		from: [number, number, number];
		to: [number, number, number];
		rotation?: {
			origin: [number, number, number];
			axis: 'x' | 'y' | 'z';
			angle: number;
			rescale?: boolean;
		};
		shade?: boolean;
		faces: Partial<Record<'north' | 'south' | 'east' | 'west' | 'up' | 'down', {
			uv: [number, number, number, number];
			texture: `#${keyof Required<BlockModelType>['textures']}`;
			cullface?: 'north' | 'south' | 'east' | 'west' | 'up' | 'down';
			rotation?: 0 | 90 | 180 | 270;
			tintindex?: -1 | 0 | 1;
		}>>
	}[]
}

export interface ItemModel extends Omit<BlockModelType, 'ambientocclusion' | 'textures' | 'parent'> {
	parent?: 'item/generated' | 'builtin/entity' | namespaced;
	textures?: Partial<Record<string | `layer${number}` | 'particules', namespaced>>;
	gui_light?: 'front' | 'side';
	overrides?: {
		predicate: Partial<Record<predicate, number>>;
		model: namespaced;
	}[];
}

export type face = 'north' | 'south' | 'east' | 'west' | 'up' | 'down';
export type Faces = Partial<Record<face, {
	uv: [number, number, number, number];
	texture: `#${keyof Required<BlockModelType>['textures']}`;
	cullface?: face;
	rotation?: 0 | 90 | 180 | 270;
	tintindex?: -1 | 0 | 1;
}>>
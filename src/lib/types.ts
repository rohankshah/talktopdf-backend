export type RoleType = 'user' | 'assistant'

export type MessageType = {
	role: RoleType
	content: string
}

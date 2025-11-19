import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

// Add projects table
export const projects = sqliteTable('projects', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  division: text('division').notNull(),
  description: text('description').notNull(),
  status: text('status').notNull(),
  location: text('location').notNull(),
  duration: text('duration').notNull(),
  image: text('image'),
  tags: text('tags', { mode: 'json' }),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Add project_enquiries table
export const projectEnquiries = sqliteTable('project_enquiries', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  division: text('division').notNull(),
  message: text('message').notNull(),
  projectId: integer('project_id').references(() => projects.id),
  createdAt: text('created_at').notNull(),
});
import factory from '@adonisjs/lucid/factories'
import Agent from '#models/agent'

export const AgentFactory = factory
  .define(Agent, async ({ faker }) => {
    return {}
  })
  .build()

#!/usr/bin/env bun

const JUCE_DIRECTORY      = 'JUCE'
const JUCE_REPOSITORY_URL = Bun.env.HAPPY_JUCE_REPOSITORY_URL ?? 'https://github.com/juce-framework/JUCE'
const JUCE_BRANCH         = Bun.env.HAPPY_JUCE_BRANCH         ?? 'master'

Bun.spawnSync([
  'git'              ,
  'clone'            ,
  '--depth'          ,
  '1'                ,
  '--branch'         ,
  JUCE_BRANCH        ,
  JUCE_REPOSITORY_URL,
  JUCE_DIRECTORY
], { stdio: ['ignore', 'ignore', 'ignore'] })

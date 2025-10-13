import fs from 'fs'
import path from 'path'

// Define the User type
export interface User {
  id: string
  email: string
  password: string // In a real app, this should be hashed
  name: string
  isPremium: boolean
  createdAt: string
}

// Define the database structure
interface Database {
  users: User[]
}

// Get the database file path
const getDbPath = () => {
  // This function should only be called on the server side
  if (typeof window !== 'undefined') {
    throw new Error('Database operations are not available in the browser')
  }
  return path.join(process.cwd(), 'data', 'database.json')
}

// Initialize the database
export const initDB = () => {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    console.warn('initDB called in browser environment, skipping')
    return
  }
  
  try {
    const dbPath = getDbPath()
    const dataDir = path.join(process.cwd(), 'data')
    
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    
    if (!fs.existsSync(dbPath)) {
      const initialData: Database = { users: [] }
      fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2))
    }
  } catch (error) {
    console.error('Error initializing database:', error)
  }
}

// Read the database
const readDB = (): Database => {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    throw new Error('Database operations are not available in the browser')
  }
  
  const dbPath = getDbPath()
  if (!fs.existsSync(dbPath)) {
    initDB()
  }
  
  const data = fs.readFileSync(dbPath, 'utf-8')
  return JSON.parse(data)
}

// Write to the database
const writeDB = (data: Database) => {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    throw new Error('Database operations are not available in the browser')
  }
  
  const dbPath = getDbPath()
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2))
}

// Find a user by email
export const findUserByEmail = (email: string): User | undefined => {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    throw new Error('Database operations are not available in the browser')
  }
  
  const db = readDB()
  return db.users.find(user => user.email === email)
}

// Find a user by ID
export const findUserById = (id: string): User | undefined => {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    throw new Error('Database operations are not available in the browser')
  }
  
  const db = readDB()
  return db.users.find(user => user.id === id)
}

// Create a new user
export const createUser = (userData: Omit<User, 'id' | 'isPremium' | 'createdAt'>): User => {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    throw new Error('Database operations are not available in the browser')
  }
  
  const db = readDB()
  
  // Check if user already exists
  if (findUserByEmail(userData.email)) {
    throw new Error('User with this email already exists')
  }
  
  const newUser: User = {
    id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    email: userData.email,
    password: userData.password, // In a real app, this should be hashed
    name: userData.name,
    isPremium: false,
    createdAt: new Date().toISOString()
  }
  
  db.users.push(newUser)
  writeDB(db)
  
  return newUser
}

// Update user premium status
export const updateUserPremiumStatus = (userId: string, isPremium: boolean): User | null => {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    throw new Error('Database operations are not available in the browser')
  }
  
  const db = readDB()
  const userIndex = db.users.findIndex(user => user.id === userId)
  
  if (userIndex === -1) {
    return null
  }
  
  db.users[userIndex].isPremium = isPremium
  writeDB(db)
  
  return db.users[userIndex]
}
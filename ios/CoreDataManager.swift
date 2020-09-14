//
//  CoreDataManager.swift
//  Pokedex
//
//  Created by Sean McGovern on 9/13/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation
import CoreData

@available(iOS 10.0, *) // required for CoreDataManager
class CoreDataManager {
  static let shared = CoreDataManager()
  private init() {}
  private lazy var persistentContainer: NSPersistentContainer = {
      let container = NSPersistentContainer(name: "Pokedex")
      container.loadPersistentStores(completionHandler: { _, error in
          _ = error.map { fatalError("Unresolved error \($0)") }
      })
      return container
  }()
  
  var mainContext: NSManagedObjectContext {
      return persistentContainer.viewContext
  }
  
  func saveChanges() {
    if (mainContext.hasChanges) {
      do{
        try mainContext.save()
      } catch {
        let nserror = error as NSError
        fatalError("Unresolved error \(nserror), \(nserror.userInfo)")
      }
    }
  }
  
  func backgroundContext() -> NSManagedObjectContext {
      return persistentContainer.newBackgroundContext()
  }
}

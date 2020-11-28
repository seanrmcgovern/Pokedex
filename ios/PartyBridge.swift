//
//  PartyBridge.swift
//  Pokedex
//
//  Created by Sean McGovern on 9/21/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation
import CoreData

@available(iOS 10.0, *) // required for CoreDataManager
@objc(PartyBridge)
class PartyBridge:NSObject {
  
  @objc
  func createPartyWithItem(_ title: NSString, item: NSDictionary, partyId: NSNumber) {
    let mainContext = CoreDataManager.shared.mainContext
    let newParty = Party(context: mainContext)
    newParty.title = title as String
    let items = NSMutableArray()
    items.add(item)
    newParty.items = items
    newParty.id = partyId as! Int64
    CoreDataManager.shared.saveChanges()
  }
  
  @objc
  func getParties(_ callback: RCTResponseSenderBlock) {
    let mainContext = CoreDataManager.shared.mainContext
    let fetchRequest: NSFetchRequest<Party> = Party.fetchRequest()
    var parties = Array<NSMutableDictionary>()
    do {
      let results = try mainContext.fetch(fetchRequest)
      for p in results {
        let nextParty = NSMutableDictionary()
        nextParty.setValue(p.title, forKey: "title")
        nextParty.setValue(p.items, forKey: "items")
        parties.append(nextParty)
      }
      callback([parties])
    } catch {
      debugPrint(error)
    }
  }
  
}

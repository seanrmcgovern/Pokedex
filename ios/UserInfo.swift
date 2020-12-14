//
//  UserInfo.swift
//  Pokedex
//
//  Created by Sean McGovern on 9/12/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation
import CoreData

@available(iOS 10.0, *) // required for CoreDataManager
@objc(UserInfo)
// class inherits from NSObject in order to be exposed to obj-c
class UserInfo: NSObject {
  
  // Persisting user data with User Defaults
  let defaults = UserDefaults.standard
  
  struct Keys {
    static let username = "username"
    static let userId = "userId"
    static let savedKanto = "savedKanto"
    static let savedJohto = "savedJohto"
    static let savedHoenn = "savedHoenn"
    static let savedSinnoh = "savedSinnoh"
    static let savedUnova = "savedUnova"
    static let savedKalos = "savedKalos"
    static let savedAlola = "savedAlola"
    static let partyCount = "partyCount"
  }
  
  // annotation used to export method in react-native
  @objc
  func getCredentials(_ callback: RCTResponseSenderBlock) {
     // let mainContext = CoreDataManager.shared.mainContext
     // print("url: \(String(describing: mainContext.persistentStoreCoordinator?.persistentStores.first?.url))")
    let curName = defaults.value(forKey: Keys.username)
    let curId = defaults.value(forKey: Keys.userId)
    let username: String
    let userId: String
    if (curName != nil) {
      username = curName as! String
      userId = curId as! String
    } else {
      username = ""
      userId = ""
    }
    callback([username, userId])
  }
  
  @objc
  func saveCredentials(_ username: NSString, withId userId: NSString) {
    print("Passed username: \(username)")
    print("Passed id:  \(userId)")
    defaults.set(username, forKey: Keys.username)
    defaults.set(userId, forKey: Keys.userId)
  }
  
  @objc
  func getPartyCount(_ callback: RCTResponseSenderBlock) {
    let curCount = defaults.value(forKey: Keys.partyCount)
    if (curCount != nil) {
      callback([curCount!])
    }
    else {
      defaults.set(0, forKey: Keys.partyCount)
      callback([0])
    }
  }
  
  @objc
  func incrementPartyCount(_ callback: RCTResponseSenderBlock) {
    let curCount = defaults.value(forKey: Keys.partyCount)
    if (curCount != nil) {
      let c = curCount as! Int
      defaults.set(c+1, forKey: Keys.partyCount)
      callback([c+1])
    }
  }
  
}

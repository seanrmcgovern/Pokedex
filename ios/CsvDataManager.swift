//
//  CsvDataManager.swift
//  Pokedex
//
//  Created by Sean McGovern on 12/10/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation
import CoreData
import UIKit

@available(iOS 10.0, *) // required for CoreDataManager
@objc(CsvDataManager)
class CsvDataManager:NSObject {
  
  struct Card {
    static let id = "id"
    static let generation = "generation"
    static let name = "name"
    static let height = "height"
    static let weight = "weight"
    static let catchRate = "catchRate"
    static let flavor = "flavor"
    static let friendship = "friendship"
    static let image = "image"
    static let types = "types"
    static let stats = "stats"
  }
  
  @objc
  func saveToCsv() {
    print("Saving CSV data")
    
    var pokeArray = Array<NSMutableDictionary>()
    
    let mainContext = CoreDataManager.shared.mainContext
    for i in 1...8 {
      // var dct = Dictionary<String, AnyObject>()
      let fetchRequest: NSFetchRequest<PokeCard> = PokeCard.fetchRequest()
      let filter = NSPredicate(format: "generation == %d", i)
      fetchRequest.predicate = filter
      let sort = NSSortDescriptor(key: "id", ascending: true)
      fetchRequest.sortDescriptors = [sort]
      do {
        let dct = NSMutableDictionary()
        let results = try mainContext.fetch(fetchRequest)
        // var pokeCards = Array<NSMutableDictionary>()
        for entry in results {
          // dct.updateValue(i as AnyObject, forKey: "EmpID")
          dct.setValue(entry.id, forKey: Card.id)
          dct.setValue(entry.generation, forKey: Card.generation)
          dct.setValue(entry.name, forKey: Card.name)
          dct.setValue(entry.height, forKey: Card.height)
          dct.setValue(entry.weight, forKey: Card.weight)
          dct.setValue(entry.catchRate, forKey: Card.catchRate)
          dct.setValue(entry.friendship, forKey: Card.friendship)
          dct.setValue(entry.flavor, forKey: Card.flavor)
          var strBase64:String = ""
          if entry.image != nil {
            let imageData = NSData(data: entry.image!)
            strBase64 = imageData.base64EncodedString(options: NSData.Base64EncodingOptions.lineLength64Characters)
          }
          dct.setValue(strBase64, forKey: Card.image)
          dct.setValue(entry.types, forKey: Card.types)
          dct.setValue(entry.stats, forKey: Card.stats)
          pokeArray.append(dct)
         }
      }
      catch {
        debugPrint(error)
      }
    }
    createCSV(from: pokeArray)
  }
  
  func createCSV(from pokeArray:Array<NSMutableDictionary>) {
    var csvString = ""
    for dct in pokeArray {
      let id = dct.value(forKey: Card.id)
      let gen = dct.value(forKey: Card.generation) 
      let name = dct.value(forKey: Card.name)
      let height = dct.value(forKey: Card.height)
      let weight = dct.value(forKey: Card.weight)
      let catchRate = dct.value(forKey: Card.catchRate)
      let friendship = dct.value(forKey: Card.friendship)
      let flavor = dct.value(forKey: Card.flavor)
      let image = dct.value(forKey: Card.image) as! String
      let types = dct.value(forKey: Card.types) as! [String]
      let stats = dct.value(forKey: Card.stats) as! [Int]
      // add the next line/pokemon to the csv, with a newline at the end
      csvString = csvString.appending("\(id!),\(gen!),\(name!),\(height!),\(weight!),\(catchRate!),\(friendship!),\"\(flavor!)\",\(image)\n")
      // types and stats will be on their own line
      for type in types {
        csvString.append("\(type),")
      }
      csvString.append("\n")
      for stat in stats {
        csvString.append("\(stat),")
      }
      csvString.append("\n")
    }
    
    let fileManager = FileManager.default
    do {
      print("creating file")
      let path = try fileManager.url(for: .documentDirectory, in: .allDomainsMask, appropriateFor: nil, create: false)
      print("path", path)
      let fileURL = path.appendingPathComponent("CSVRec.csv")
      print("fileURL", fileURL)
      try csvString.write(to: fileURL, atomically: true, encoding: .utf8)
    } catch {
      print("error creating file")
    }
    
  }
  
}

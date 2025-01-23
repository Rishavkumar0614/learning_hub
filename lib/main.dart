import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() async {
  runApp(const App());
  final response = await http.post(
    Uri.parse('http://localhost:3000/'),
    
  );
}

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp();
  }
}
